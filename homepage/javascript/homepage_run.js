const FallingSquares = require("./../../src/games/falling_squares/falling_squares.js");

let fallingBoard;
let cavansDiv;
let colour;

window.addEventListener("load", function(){

  cavansDiv = document.getElementById("canvas");

  colour = {
    borderColour: "transparent",
    fillColour: "transparent",
    fallingSquareColour: "rgba(255,0,0,0.6)",
  }

  buildCanvas();
});

window.addEventListener("resize", function(){
  buildCanvas();
});

function buildCanvas(){

  const canvasWidth = cavansDiv.offsetWidth;
  const canvasHeight = cavansDiv.offsetHeight;
  const columnCount = canvasWidth / 7.5;
  const rowCount = canvasHeight / 7.5;

  if(fallingBoard) fallingBoard.board.remove();
  fallingBoard = new FallingSquares(cavansDiv, columnCount, rowCount, rowCount*3, 40, colour);
  fallingBoard.run();
}
