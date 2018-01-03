let colors = generateRandomColors(6);

let squares = document.querySelectorAll('.square');
let pickedColor = pickColor();
let colorDisplay = document.getElementById('colorDisplay');
let messageDisplay = document.querySelector('#message');
let h1 = document.querySelector('h1');
let resetButton = document.getElementById('reset');

colorDisplay.textContent = pickedColor;

for(let i=0; i<squares.length; i++) {
  //add initial colors to squares
  squares[i].style.backgroundColor = colors[i];

  //add click listeners to squares
  squares[i].addEventListener('click',()=>{
    //grab color of clicked square
    let clickedColor = squares[i].style.backgroundColor;
    if(clickedColor === pickedColor) {
      messageDisplay.textContent = 'Correct';
      changeColors(clickedColor);
      h1.style.backgroundColor = clickedColor;
      resetButton.textContent = 'Play Again?'
    } else {
      squares[i].style.backgroundColor = '#232323';
      messageDisplay.textContent = 'Try Again!';
    }
  });
}

function changeColors(color) {
  for(let square of squares) {
    square.style.backgroundColor = color;
  }
} 

function pickColor() {
  let random =  Math.floor(Math.random() * colors.length);
  return colors[random];  
}

function generateRandomColors(num) {
  //make an array
  const arr = [];
  //add num random colors to array
  for (let i = 0; i < num; i++) {
    //get random colors and push into array
    arr.push(randomColor());
  }
  //return that array
  return arr;
}

function randomColor() {
  //pick a red from 0 to 255
  let r = Math.floor(Math.random() * 256);
  //pick a green from 0 to 255
  let g = Math.floor(Math.random() * 256);
  //pick a blue from 0 to 255
  let b = Math.floor(Math.random() * 256);
  // we want to return random "rgb(r, g, b)" and 
  return "rgb(" + r + ', ' + g + ', ' + b + ")";
}

resetButton.addEventListener('click', function() {
  //generate all new colors
  colors = generateRandomColors(6);
  //pick a new random color from array
  pickedColor = pickColor();
  //change colorDisplay to matched picked color
  colorDisplay.textContent = pickedColor;
  //change colors of squares
  for(let i=0; i<squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];
  }
  h1.style.backgroundColor = '#232323';
});