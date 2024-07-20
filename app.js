const buttons = document.querySelectorAll('.button');
const display = document.querySelector('.display');

let displayContent = '';

let firstNumber = 0;
let secondNumber = 0;
let operator = '';

function updateDisplay(content) {
    if(display.textContent === '0') { 
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

function handleButtonInteractions(button) {
    if(button.dataset.value === undefined) return;
    
    if(button.dataset.value === '+' 
        || button.dataset.value === '-' 
        || button.dataset.value === '*' 
        || button.dataset.value === '/'
    ) {
        firstNumber = displayContent;
    }

    updateDisplay(button.dataset.value);
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        handleButtonInteractions(button);
    });
});

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
    return a / b;
}