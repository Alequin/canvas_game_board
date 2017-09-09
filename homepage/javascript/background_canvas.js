const FallingSquares = require("./../../src/games/falling_squares/falling_squares.js");

function BackgroundCanvas(){
  this.fallingBoard;
  this.cavansDiv = document.getElementById("background-canvas");
  this.colour = {
    borderColour: "transparent",
    fillColour: "transparent",
    fallingSquareColour: "rgba(0,0,0,0.3)",
  }

  window.addEventListener("resize", () => {this.buildCanvas();});
}

BackgroundCanvas.prototype.buildCanvas = function(){

  const canvasWidth = this.cavansDiv.offsetWidth;
  const canvasHeight = this.cavansDiv.offsetHeight;
  const columnCount = canvasWidth / 7.5;
  const rowCount = canvasHeight / 7.5;

  if(this.fallingBoard) this.fallingBoard.board.remove();
  this.fallingBoard = new FallingSquares(this.cavansDiv, columnCount, rowCount, rowCount*2, 40, this.colour);
  this.fallingBoard.run();
}

module.exports = BackgroundCanvas;
