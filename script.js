const operators = ['+', '-', '*', '/']

const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

const validKeys = [...nums, ...operators];

/* html elements */

const inputDiv = document.querySelector('#result');

const expressionDiv = document.querySelector('#expression');

const btns = document.querySelectorAll('button');



/* operation functions */

const add = ( a, b ) => a + b;

const subtract = ( a, b ) => a - b;

const multiply = ( a, b ) => a * b;

const divide = ( a, b ) => {
  if ( b === 0 ) {
    // todo handle exception case
    return 'cannot divide by 0'
  } else {
    // todo round the number?
    return a / b;
  }
}


function operate( operator, a, b ) {

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


function getPressedBtn (e) {
  updateDisplay(e.target.id);
}



function getPressedKey(e) {
  
  const keyPressed = document.getElementById(`${e.key}`);

  if (keyPressed) updateDisplay(e.key);
}

let lastOperator = '+';
let lastResult = 0;
let secondNumFlag = false;
let lastKey;

function updateExpressionFont () {
    
  let containerWidth = expressionDiv.parentNode.clientWidth;

  let containerHeight = expressionDiv.parentNode.clientHeight;
  
  let originalFontSize = window.getComputedStyle(expressionDiv).fontSize.replace('px','');

  let newCharLength = expressionDiv.textContent.length + inputDiv.textContent.length + 1;
  
  newSize = Math.floor(Math.sqrt(containerWidth * containerHeight / (2 * newCharLength) )); 
  
  if ( newSize < Number(originalFontSize) ) {
    expressionDiv.style.fontSize = newSize + 'px';
  };
  
}

function updateDisplay(key) {

  if ( secondNumFlag && nums.includes(key)) {
    inputDiv.textContent = 0;
    secondNumFlag = false;
  }

  if ( !secondNumFlag && nums.includes(key) && inputDiv.textContent.length <= 18 )
    inputDiv.textContent = (parseFloat(inputDiv.textContent.replace(/,/g, '')) * 10 +  Number(key)).toLocaleString('en');

  if ( operators.includes(key) ) {
  
      if ( !operators.includes(lastKey) ) { 
        updateExpressionFont();

        if (['*', '/'].includes(key) && ['+', '-'].includes(lastOperator)) {
          expressionDiv.textContent = '(' + expressionDiv.textContent + inputDiv.textContent + ')' + key;
        } else {
          expressionDiv.textContent += inputDiv.textContent + key;
        }
        
        inputDiv.textContent = operate( lastOperator, Number(lastResult), 
                            parseFloat(inputDiv.textContent.replace(/,/g, '')) );

        lastOperator = key;
        lastResult = inputDiv.textContent;
    } else {
      expressionDiv.textContent = expressionDiv.textContent.slice(0,expressionDiv.textContent.length-1) + key;
    }
    
    secondNumFlag = true;
    
  } 

  lastKey = key; 
}

function initialize() {
  expressionDiv.textContent = '';
  inputDiv.textContent = 0;
}

initialize();

btns.forEach( item => item.addEventListener('click', getPressedBtn) );

window.addEventListener('keydown', getPressedKey);



