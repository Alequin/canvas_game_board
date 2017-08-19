var Board = require("./../../board/board");
var Animation = require("./../../animate/animate");
var randomInt = require("./../../other/random");

function FallingSquares(container){
  var boardContainer = document.getElementById("game-board");
  this.board = new Board(boardContainer);
  this.board.generateSquares(10, 10, "black", "white");
}

module.exports = FallingSquares;
