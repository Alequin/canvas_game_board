var Board = require("./../../board/version2/board/board");
var Block = require("./../../board/version2/elements/block");

window.addEventListener("load", function(){
  var boardContainer = document.getElementById("game-board");
  var board = new Board(boardContainer);
  board.generateSquares(5, 5, "black", "white");
  board.draw();

  canMoveBlockDown(board);
});

function canMoveBlockDown(board){

  const squares = [
    board.getSquareByPosition(1,1),
    board.getSquareByPosition(1,2),
    board.getSquareByPosition(2,2)
  ]

  const block = new Block(board, squares);
  block.setFill("blue");
  block.draw();

  setTimeout(() => {
    const newBlock = block.getBlockBottom();

    block.setFill("white");
    block.remove();
    block.draw();

    newBlock.setFill("blue");
    newBlock.remove();
    newBlock.draw();
  }, 1000);

}

function canRemoveBlock(board){

  const squares = [
    board.getSquareByPosition(1,1),
    board.getSquareByPosition(1,2),
    board.getSquareByPosition(2,2)
  ]

  const block = new Block(board, squares);
  block.remove();

}

function canDrawBlock(board){

  const squares = [
    board.getSquareByPosition(1,1),
    board.getSquareByPosition(1,2),
    board.getSquareByPosition(2,2)
  ]

  const block = new Block(board, squares);
  block.setFill("blue");
  block.setBorder("yellow");
  block.draw();

}

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
