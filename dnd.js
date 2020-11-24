//call the body
const body = document.querySelector('body');

//set state Variables
let isSquareClicked = false;
let clickTarget = undefined;
let offset = {};

//this is be the template for the squares
const squareDiv = `
<div
class='square'
style='background-color:black;
width:200px;
height:200px'>
</div>`;

//this is the function that create the squares
function createSquare() {
  //replace old html to new html plus a new square from template
  body.innerHTML = squareDiv + body.innerHTML;
  //NOTE: because i am seting a new innerHTML old event listeners are cleared.

  //add event listeners to EACH squares and use position absolute on them.
  const divs = document.querySelectorAll('.square');
  divs.forEach((div) => {
    div.style.position = 'absolute';

    //this trigger when you begin the click inside the square
    div.addEventListener('mousedown', mouseDown);

    //this trigger when you finish the click inside the square
    div.addEventListener('mouseup', mouseUp);
  });
}

//create initial square
createSquare();

//global mouse listener
document.addEventListener('mousemove', mouseMove);

//--------------------------------------------

function mouseMove(e) {
  //This only happen if you are clicking a square
  if (isSquareClicked) {
    clickTarget.style.left = e.clientX - offset.x + 'px';
    clickTarget.style.top = e.clientY - offset.y + 'px';
  }
}

function mouseDown(e) {
  console.log(e.target);
  //set the square being clicked as clickTarget on state
  clickTarget = e.target;
  //change the color for visual reference
  e.target.style.backgroundColor = 'red';
  //set the offset between the pointer and the borders of the square to avoid the square jump to center the pointer.
  offset = { x: e.offsetX, y: e.offsetY };
  //activate the mouseMoveListener
  isSquareClicked = true;
}

function mouseUp(e) {
  //set the square color to blue to visual reference
  e.target.style.backgroundColor = 'blue';
  //create a new square
  createSquare();
  //shut down the mouseMoveListener
  isSquareClicked = false;
}
