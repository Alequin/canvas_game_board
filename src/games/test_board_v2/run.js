var Board = require("./../../board/version2/board/board");

window.addEventListener("load", function(){
  var boardContainer = document.getElementById("game-board");
  var board = new Board(boardContainer);
  board.generateSquares(5, 5, "black", "white");
  board.draw();

  canGetSquareAbove(board)
});

function canGetSquareAbove(board){
  const square = board.getSquareByPosition(0,2);
  const square2 = board.getSquareTop(square.position);
  square2.style.fillColour = "blue";
  square2.draw();
}
