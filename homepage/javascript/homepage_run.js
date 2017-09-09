const FallingSquares = require("./../../src/games/falling_squares/falling_squares.js");

let fallingBoard;
let cavansDiv;
let colour;

window.addEventListener("load", function(){

  cavansDiv = document.getElementById("canvas");

  colour = {
    borderColour: "black",
    fillColour: "transparent",
    fallingSquareColour: "#ff6200",
  }

  buildCanvas();
});

window.addEventListener("resize", function(){
  buildCanvas();
});

function buildCanvas(){

  const canvasWidth = cavansDiv.offsetWidth;
  const canvasHeight = cavansDiv.offsetHeight;
  const columnCount = canvasWidth / 30;
  const rowCount = canvasHeight / 30;

  if(fallingBoard) fallingBoard.board.remove();
  fallingBoard = new FallingSquares(cavansDiv, columnCount, rowCount, 15, 2, colour);
  fallingBoard.run();
}
