function eval() {
    // Do not use eval!!!
    return;
}

const isNumber = (letter) => isFinite(letter) && letter !== ' '

function convertPolishNotation(str) {
    const OPERATORS_PRIORITY = {
        "+": 1,
        "-": 1,
        "*": 2,
        "/": 2,
    };

    let stack = [];
    let result = "";

    for (let i = 0; i < str.length; ++i) {
        if (isNumber(str[i])) {
            while (isNumber(str[i])) {
                result += str[i];
                ++i;
            }
            result += ' ';

            --i;
        }
        else if (str[i] === '(') {
            stack.push(str[i]);
        }
        else if (str[i] === ')') {
            if (stack.indexOf('(') === -1)
                throw new SyntaxError(
                    "ExpressionError: Brackets must be paired");

            while (stack[stack.length - 1] !== '(') {
                result += stack.pop();
            }
            stack.pop();
        }
        else if ('+-*/'.indexOf(str[i]) !== -1) {
            while (OPERATORS_PRIORITY[str[i]] <= OPERATORS_PRIORITY[stack[stack.length - 1]]) {
                result += stack.pop();
            }

            stack.push(str[i]);
        }
    }

    while (stack.length > 0) {
        if (stack[stack.length - 1] === '(') {
            throw new Error("ExpressionError: Brackets must be paired");
        }
        result += stack.pop();
    }

    return result;
}

function expressionCalculator(expr) {
    let strPN = convertPolishNotation(expr);
    let stack = [];

    for (let i = 0; i < strPN.length; ++i) {
        if (isNumber(strPN[i])) {
            let num = '';

            while (isNumber(strPN[i])) {
                num += strPN[i];
                ++i;
            }

            --i;
            stack.push(Number(num));
        }
        else if (strPN[i] === ' ') { }
        else {
            let second = stack.pop();
            let first = stack.pop();

            switch (strPN[i]) {
                case '+':
                    stack.push(first + second);
                    break;
                case '-':
                    stack.push(first - second);
                    break;
                case '*':
                    stack.push(first * second);
                    break;
                case '/':
                    if (second === 0)
                        throw new Error(
                            "TypeError: Division by zero.");
                    stack.push(first / second);
                    break;
                default:
                    break;
            }
        }
    }

    return stack.pop();
}

module.exports = {
    expressionCalculator
}