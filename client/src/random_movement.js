var Board = require("./board");
var randomInt = require("./random");

function MovementSquare(colour){
  var boardContainer = document.getElementById("game-board");
  this.board = new Board(boardContainer);

  this.board.generateSquares(9, 9, "black", "white");
  this.currentSquare = null;

  this.colour = colour;
}

MovementSquare.prototype.run = function(){
  this.prepareSquare();
}

MovementSquare.prototype.prepareSquare = function(){
  this.currentSquare = this.board.getSquareByPosition(4,4);
  this.currentSquare.style.fillColour = this.colour;
  this.board.draw();
}

MovementSquare.prototype.moveSquare = function(){
  var nextSquare = this.getNextSquare();

  this.currentSquare.style.fillColour = "white";
  nextSquare.style.fillColour = this.colour;

  this.currentSquare.draw();
  nextSquare.draw();

  this.currentSquare = nextSquare;
}

MovementSquare.prototype.getNextSquare = function(){

  var nextSquare = null;
  while(!nextSquare){
    switch(randomInt(0, 4)){
      case 0:
        nextSquare = this.currentSquare.getSquareTop();
      break;
      case 1:
        nextSquare = this.currentSquare.getSquareLeft();
      break;
      case 2:
        nextSquare = this.currentSquare.getSquareBottom();
      break;
      case 3:
        nextSquare = this.currentSquare.getSquareRight();
      break;
    }
  }

  return nextSquare;
}

module.exports = MovementSquare;
