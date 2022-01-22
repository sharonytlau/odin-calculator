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

let currentOperator = '+';
let lastOperator;
let lastResult = 0;
let secondNumFlag = false;
let floatNumFlag = false;
let floatNum = 1;
let lastKey;

function clearFloat () {
  floatNumFlag = false;
  floatNum = 1;
}

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

  if ( !validKeys.includes(key) ) return;

  if ( secondNumFlag && nums.includes(key)) {
    inputDiv.textContent = 0;
    secondNumFlag = false;
    floatNumFlag = false;
  }

  if ( !secondNumFlag && nums.includes(key) && inputDiv.textContent.length <= 18 ) {

    if ( !floatNumFlag && key === '.' ) {
      inputDiv.textContent += key;
      floatNumFlag = true;
      floatNum = 1;
    } else if ( floatNumFlag && key !== '.' ) {
      // console.log(floatNum);
      // console.log(parseFloat(inputDiv.textContent) );
      // console.log( Number(key) / Math.pow(10,floatNum));
      // console.log(parseFloat(inputDiv.textContent) + Number(key) / Math.pow(10,floatNum));
      inputDiv.textContent = inputDiv.textContent + Number(key) ;
      floatNum++;
    } else if ( !floatNumFlag ) {
      inputDiv.textContent =  parseFloat(inputDiv.textContent) * 10 +  Number(key) ;
    }

  }

  if ( operators.includes(key) ) {
  
    if ( !operators.includes(lastKey) ) { 
      updateExpressionFont();

      if ( expressionDiv.textContent && ['*', '/'].includes(key) && ['+', '-'].includes(lastOperator)) {
        expressionDiv.textContent = '(' + expressionDiv.textContent + inputDiv.textContent + ')' + key;
      } else {
        expressionDiv.textContent += inputDiv.textContent + key;
      }
      
      inputDiv.textContent = operate( currentOperator, Number(lastResult), 
                          parseFloat(inputDiv.textContent.replace(/,/g, '')) );

      lastOperator = currentOperator;
      lastResult = inputDiv.textContent;
    } else {
      expressionDiv.textContent = expressionDiv.textContent.slice(0,expressionDiv.textContent.length-1) + key;
    }

    currentOperator = key;
    secondNumFlag = true;
    floatNumFlag = false;
    
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



