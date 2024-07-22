const EMPTY_STRING = '';

const buttons = document.querySelectorAll('.button');
const display = document.querySelector('.display');

let displayContent = '0';
let shouldClearDisplay = false;

let firstNumber = undefined;
let secondNumber = undefined;
let operator = undefined;

function updateDisplay(content, isResult = false) {
    if(displayContent.includes('ERROR')) shouldClearDisplay = true;

    if(shouldClearDisplay || isResult) { 
        displayContent = content;
    } else {
        displayContent += content;
    }

    shouldClearDisplay = false;
    display.textContent = displayContent;
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
    if(button.dataset.value === '.') {
        if(displayContent.includes('.') && firstNumber === undefined) return;
    
        const dotsOnDisplay = displayContent.split('.').length;
        if(dotsOnDisplay > 2) return;
    }

    if(button.dataset.value === '=') {
        handleResult();
    } else if(button.dataset.value !== undefined) {
        if(displayContent === '0' && isNumber(button.dataset.value)) {
            shouldClearDisplay = true;
        }

        updateDisplay(button.dataset.value);
    }

    handleActions(button);
    handleOperator(button);
}

function handleActions(button) {
    switch (button.dataset.action) {
        case 'clear':
            resetCalculator();
            break;
        case 'clear-last':
            deleteLastContent();
            break;
        default: break;
    }
}

function isNumber(value) {
    return value >= 0 && value <= 9;
}

function resetCalculator() {
    firstNumber = undefined;
    secondNumber = undefined;
    operator = undefined;

    updateDisplay('0', true);
    shouldClearDisplay = false;
}

function deleteLastContent() {
    const displayContentLength = displayContent.length;
    if(displayContentLength > 1) { 
        updateDisplay(displayContent.slice(0, -1), true);
    }

    const firstNumberLength = // +2 because we need to count the operator as well
        firstNumber !== undefined ? firstNumber.toString().length + 2 : 0;

    if(firstNumber !== undefined && displayContentLength < firstNumberLength) {
        firstNumber = undefined;
        secondNumber = undefined;
    }
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
    if(b === 0) return 0;
    return a / b;
}