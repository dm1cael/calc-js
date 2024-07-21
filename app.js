const EMPTY_STRING = '';

const buttons = document.querySelectorAll('.button');
const display = document.querySelector('.display');

let displayContent = '';
let shouldClearDisplay = true;

let firstNumber = undefined;
let secondNumber = undefined;
let operator = undefined;

function updateDisplay(content, isResult = false) {
    if(displayContent.includes('ERROR')) shouldClearDisplay = true;

    if(shouldClearDisplay || isResult) { 
        display.textContent = content;
    } else {
        display.textContent += content;
    }

    shouldClearDisplay = false;
    displayContent = display.textContent;
}

function operate(firstNumber, secondNumber, operator) {
    switch (operator) {
        case '+':
            return add(firstNumber, secondNumber);
        case '-':
            return sub(firstNumber, secondNumber);
        case '*':
            return multiply(firstNumber, secondNumber);
        case '/':
            return divide(firstNumber, secondNumber);
        default:
            return 'ERROR: Unknown operation';
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        handleButtonInteractions(button);
    });
});

function handleButtonInteractions(button) {
    if(button.dataset.value === '=') {
        handleResult();
    } else if(button.dataset.value !== undefined) {
        updateDisplay(button.dataset.value);
    }

    handleOperator(button);
}

function getSecondNumber(nextOperator) {
    if(operator === undefined) return;
    let operatorIndex = EMPTY_STRING;

    if(firstNumber > 0) {
        operatorIndex = displayContent.indexOf(operator);
    } else {
        const firstNumberIndex = displayContent.indexOf(firstNumber);
        operatorIndex = displayContent.indexOf(operator, firstNumberIndex + 1);
    }

    const second = displayContent.slice(operatorIndex + 1);

    if(second < 0) return EMPTY_STRING;
    return getDisplayWithNoOperator(second, nextOperator);
}

function handleResult(nextOperator = EMPTY_STRING) {
    if(firstNumber === undefined || operator === undefined) return;
    const localSecondNumber = getSecondNumber(nextOperator);

    if(secondNumber !== EMPTY_STRING || secondNumber !== undefined) {
        firstNumber = Number(firstNumber);
        secondNumber = Number(localSecondNumber);

        let result = operate(firstNumber, secondNumber, operator);
        updateDisplay(result + nextOperator, true);

        console.log(firstNumber, secondNumber, operator);

        firstNumber = getDisplayWithNoOperator(displayContent, nextOperator);
        secondNumber = undefined;
        operator = undefined;
    }
}

function handleOperator(button) {
    if (button.dataset.value === '+'
        || button.dataset.value === '-'
        || button.dataset.value === '*'
        || button.dataset.value === '/') {
        if(firstNumber === undefined) {
            firstNumber = getDisplayWithNoOperator(displayContent, button.dataset.value);
        }

        if(getSecondNumber() !== EMPTY_STRING) {
            handleResult(button.dataset.value);
        }

        operator = button.dataset.value;
    }
}

function getDisplayWithNoOperator(raw, operator) {
    return raw.replace(operator, EMPTY_STRING);
}

// Basic functions

function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if(b === 0) return 'ERROR: You can\'t divide by zero.';
    return a / b;
}