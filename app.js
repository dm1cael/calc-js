const buttons = document.querySelectorAll('.button');
const display = document.querySelector('.display');

let displayContent = '';

let firstNumber = undefined;
let secondNumber = undefined;
let operator = undefined;

function updateDisplay(content, isResult = false) {
    if(display.textContent === '0' || isResult) { 
        display.textContent = content;
    } else {
        display.textContent += content;
    }

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
            return 'Unknown operation';
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        handleButtonInteractions(button);
    });
});

function handleButtonInteractions(button) {
    handleOperator(button);

    if(button.dataset.value === '=') {
        handleResult();
    } else if(button.dataset.value !== undefined) {
        updateDisplay(button.dataset.value);
    }
}

function getSecondNumber() {
    if(operator === undefined) return;
        
    const operatorIndex = displayContent.indexOf(operator);
    const second = displayContent.slice(operatorIndex + 1);
    
    return second;
}

function handleResult() {
    if(firstNumber === undefined || operator === undefined) return;
    const localSecondNumber = getSecondNumber();

    if(secondNumber !== '' || secondNumber !== undefined) {
        firstNumber = Number(firstNumber);
        secondNumber = Number(localSecondNumber);

        let result = operate(firstNumber, secondNumber, operator);
        updateDisplay(result, true);

        secondNumber = undefined;
        operator = '';
    }
}

function handleOperator(button) {
    if (button.dataset.value === '+'
        || button.dataset.value === '-'
        || button.dataset.value === '*'
        || button.dataset.value === '/') {
        firstNumber = displayContent;
        operator = button.dataset.value;
    }
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
    if(b === 0) return 'You can\'t divide by zero.';
    return a / b;
}