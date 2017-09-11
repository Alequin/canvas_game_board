var Board = require("./../../board/version2/board/board");

window.addEventListener("load", function(){
  var boardContainer = document.getElementById("game-board");
  var board = new Board(boardContainer);
  board.generateSquares(5, 5, "black", "white");
  board.draw();


});



function canUseSavedStates(board){

  board.saveState("blank");

  const firstColumn = board.squares[0];

  for(let square of firstColumn){
    square.style.fillColour = "blue";
    square.addImage("./../images/cat.png", 1);
  }

  setTimeout(() => {
    for(let square of firstColumn){
      square.remove();
      square.draw();
    }

    board.loadSavedState("blank");
  }, 40);
}

function canSwitchSquaresUsingSquare(board){
  const square = board.getSquareByPosition(0,2);
  square.style.fillColour = "blue";
  const square2 = board.getSquareByPosition(2,2);
  square2.style.fillColour = "yellow";
  square.switchWith(square2);
  square.draw();
  square2.draw();
}

function canSwitchSquaresUsingBoard(board){
  const square = board.getSquareByPosition(0,2);
  square.style.fillColour = "blue";
  const square2 = board.getSquareByPosition(2,2);
  square2.style.fillColour = "yellow";
  board.switchSquares(square2, square);
  square.draw();
  square2.draw();
}

function canGetSquareAbove(board){
  const square = board.getSquareByPosition(0,2);
  const square2 = square.getTop();
  square2.style.fillColour = "blue";
  square2.draw();
}
