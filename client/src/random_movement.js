var Board = require("./board");

function MovementSquare(){
  var boardContainer = document.getElementById("game-board");
  this.board = new Board(boardContainer);

  this.board.generateSquares(9, 9, "black", "white");
}

MovementSquare.prototype.run = function(){
  var startSquare = this.board.getSquareByPosition(4,4);
  startSquare.style.fillColour = "red";
}

module.exports = MovementSquare;
