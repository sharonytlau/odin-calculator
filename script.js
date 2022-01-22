const operators = ['+', '-', '*', '/'];

const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];

const validKeys = [...nums, ...operators];

/* html elements */

const inputDiv = document.querySelector('#result');

const expressionDiv = document.querySelector('#expression');

const btns = document.querySelectorAll('button');

/* operation functions */

const add = ( a, b ) => a + b;

const subtract = ( a, b ) => a - b;

const multiply = ( a, b ) => a * b;

const divide = ( a, b ) => a / b;

function operate( operator, a, b ) {

  console.log(operator, a, b);

  switch (operator){
    case '+':
      return add(a,b);
    case '-':
      return subtract(a,b);
    case '*':
      return multiply(a,b);
    case '/':
      return divide(a,b);
  }

}

/* interaction with page */

let currentOperator = '+';
let equalFlag = false;
let currentResult = 0;
let secondNumFlag = false;

function getPressedBtn (e) {

  updateDisplay(e.target.id);

}

function getPressedKey(e) {

  if ( e.ctrlKey ) return;

  const keyPressed = document.getElementById(`${e.key}`);

  if (keyPressed) keyPressed.click();  

}

function roundResult(num) {
  num = Number(num);
  return  parseFloat(num.toPrecision(14))
}


function updateDisplay(key) {

  if ( key === 'reset' ) initialize();

  if ( key === 'delete' && !equalFlag && !secondNumFlag && inputDiv.textContent !== '0') {
    inputDiv.textContent = ( inputDiv.textContent.length > 1 ) ? inputDiv.textContent.slice(0, inputDiv.textContent.length-1) : 0;
  };

  if ( key === '=' && !equalFlag ) {
  
    currentResult = operate( currentOperator, Number(currentResult), 
          parseFloat(inputDiv.textContent) );
    
    expressionDiv.textContent += inputDiv.textContent + key;

    if ( currentResult === Infinity ) {
      alert('Division by zero is undefined');
      initialize();
      return;
    }

    inputDiv.textContent = roundResult(currentResult);

    equalFlag = true;

    secondNumFlag = true;

  } else if ( !validKeys.includes(key) ) {
    return;
  }

  if ( nums.includes(key) ) {

    if ( secondNumFlag ) {
    
      if ( equalFlag) initialize();

      inputDiv.textContent = 0;
  
      secondNumFlag = false;
  
      floatNumFlag = false;

    }

    if ( !secondNumFlag ) {

      if ( ( inputDiv.textContent.includes('.') && key === '.' ) 
            || inputDiv.textContent.length === 15 ) return;
  
      inputDiv.textContent = ( key != '.' && inputDiv.textContent === '0') ? 
                                          key : inputDiv.textContent + key ;
  
    }

  }

  if ( operators.includes(key) ) {

    equalFlag = false;
      
    if ( !secondNumFlag ) {

      currentResult = operate( currentOperator, Number(currentResult), 
                            parseFloat(inputDiv.textContent) );

      if ( ! Number.isInteger(currentResult) ) {
        currentResult = currentResult.toPrecision(14)
      }
      
      if ( currentResult === Infinity) {
        alert('Division by zero is undefined');
        initialize();
        return;
      }

      inputDiv.textContent = roundResult(currentResult);

    }

    currentOperator = key;
    expressionDiv.textContent = inputDiv.textContent + key;

    secondNumFlag = true;
    floatNumFlag = false;
    
  } 

}

function initialize() {
  currentOperator = '+';
  equalFlag = false;
  currentResult = 0;
  secondNumFlag = false;
  expressionDiv.textContent = '';
  inputDiv.textContent = 0;
}

initialize();

btns.forEach( item => item.addEventListener('click', getPressedBtn) );

window.addEventListener('keydown', getPressedKey);