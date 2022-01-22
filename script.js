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

function updateFont (div) {
    
  let containerWidth = div.parentNode.clientWidth;
  
  let newCharLength = inputDiv.textContent.length + 1;
  
  newSize = Math.floor(containerWidth / newCharLength ); 
  
  div.style.fontSize = newSize + 'px';
  
}

function updateDisplay(key) {

  if ( !validKeys.includes(key) ) return;

  if ( nums.includes(key) ) {

    if ( secondNumFlag ) {
    
      inputDiv.textContent = 0;
  
      secondNumFlag = false;
  
      floatNumFlag = false;
    }

    if ( !secondNumFlag ) {

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

  }

  if ( operators.includes(key) ) {
      
    if ( !secondNumFlag ) {
      inputDiv.textContent = operate( currentOperator, Number(lastResult), 
                            parseFloat(inputDiv.textContent) );

      lastResult = inputDiv.textContent;
    }

    currentOperator = key;
    expressionDiv.textContent = inputDiv.textContent + key;

    secondNumFlag = true;
    floatNumFlag = false;
    
  } 

}

function initialize() {
  expressionDiv.textContent = '';
  inputDiv.textContent = 0;
}

initialize();

btns.forEach( item => item.addEventListener('click', getPressedBtn) );

window.addEventListener('keydown', getPressedKey);



