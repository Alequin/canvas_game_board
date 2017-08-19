var Board = require("./board");

function MovementSquare(){
  var boardContainer = document.getElementById("game-board");
  this.board = new Board(boardContainer);

  this.board.generateSquares(9, 9, "black", "white");
  this.currentSquare = null;
}

MovementSquare.prototype.run = function(){
  this.prepareSquare();
}

MovementSquare.prototype.prepareSquare = function(){
  this.currentSquare = this.board.getSquareByPosition(4,4);
  this.currentSquare.style.fillColour = "red";
  this.board.draw();
}

MovementSquare.prototype.moveSquare = function(){



}

module.exports = MovementSquare;
