const operators = ['+', '-', '*', '/']

const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

const validKeys = [...nums, ...operators];

/* html elements */

const resultDiv = document.querySelector('#result');

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

// function updateNum(key){

// }


let secondNumFlag = false;
let previousNum;

function updateDisplay(key) {

  textWidth = resultDiv.offsetWidth;
  
  containerWidth = resultDiv.parentNode.clientWidth;


  if ( secondNumFlag && nums.includes(key)) {
    console.log('here');
    resultDiv.textContent = 0;
    secondNumFlag = false;
  }

  if ( !secondNumFlag && nums.includes(key) && textWidth + 50 < containerWidth )
    resultDiv.textContent = (parseFloat(resultDiv.textContent.replace(/,/g, '')) * 10 +  Number(key)).toLocaleString('en');

  if ( !secondNumFlag && operators.includes(key) && operators.some(element => expressionDiv.textContent.includes(element)) ) {
  
    let operator = expressionDiv.textContent.match(/\*|\/|\-|\+/g).at(-1);
    let a = previousNum;
    let b = resultDiv.textContent;

    console.log(a);
    console.log(b);
    
    expressionDiv.textContent += resultDiv.textContent + key;
    resultDiv.textContent = operate( operator, Number(a), Number(b) );
  } 
  
  if (operators.includes(key)) {
    expressionDiv.textContent = resultDiv.textContent + key;
    previousNum = Number(resultDiv.textContent);
    secondNumFlag = true;
  }


  // if ( !secondNumFlag && operators.some(element => expressionDiv.textContent.includes(element)) && operators.includes(key) ) {
    
  //   console.log(a);
  //   console.log(b);

  //   resultDiv.textContent = operate( operator, Number(a), Number(b) );



  
}

btns.forEach( item => item.addEventListener('click', getPressedBtn) );

function initialize(e) {
  displayDiv.textContent = 0;
}
window.addEventListener('keydown', getPressedKey);