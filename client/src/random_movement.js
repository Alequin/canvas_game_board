var Board = require("./board");
var randomInt = require("./random");

var count = 0;

function MovementSquare(colour){
  var boardContainer = document.getElementById("game-board");
  this.board = new Board(boardContainer);

  this.board.generateSquares(9, 9, "black", "white");
  this.currentSquare = null;

  this.colour = colour;
}

MovementSquare.prototype.run = function(){
  this.prepareSquare();

  setInterval(function(){
    this.moveSquare();
  }.bind(this), 250);
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

  console.log("pos", nextSquare.position.x, nextSquare.position.y);
  this.currentSquare = nextSquare;
}

MovementSquare.prototype.getNextSquare = function(){

  var nextSquare = null;

  var x = this.currentSquare.position.x;
  var y = this.currentSquare.position.y

  while(!nextSquare){
    switch(randomInt(0, 3)){
      case 0:
        nextSquare = this.board.getSquareTop(1, x, y);
      break;
      case 1:
        nextSquare = this.board.getSquareLeft(1, x, y);
      break;
      case 2:
        nextSquare = this.board.getSquareBottom(1, x, y);
      break;
      case 3:
        nextSquare = this.board.getSquareRight(1, x, y);
      break;
    }
  }

  return nextSquare;
}

module.exports = MovementSquare;
