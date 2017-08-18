var Board = require("./board");

window.addEventListener("load", function(){

  var boardContainer = document.getElementById("game-board");
  var board = new Board(boardContainer);
  board.generateSquares(10, 10, "black", "white");
  board.draw();

  var square = board.getSquareByPosition(0, 0);

  square.handleEnter = function(){
    console.log("enter");
  }
  square.handleLeave = function(){
    console.log("leave");
  }

  board.events.activateOnEnter();
  board.events.activateOnLeave();
});

function logSquare(board, square){
  console.log(square.center);
}

function onSquareClick(board, square){

  if(square.position.x === 8  && square.position.y === 9){
    board.addSavedState("save");
    return;
  }
  if(square.position.x === 9  && square.position.y === 9){
    board.loadSavedState("save");
    return;
  }

  square.style.borderColour = "orange";
  square.addImage("cat.png", 1);
  square.draw();
}

function onSquareClick1(square){
  square.remove();
}

function testReloadView(board){
  var ctx = board.context;

  var imageData = ctx.getImageData(0, 0, board.width, board.height);
  ctx.clearRect(0, 0, board.width, board.height);
  ctx.putImageData(imageData, 0, 0);
}
