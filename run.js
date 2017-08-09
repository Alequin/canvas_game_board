window.addEventListener("load", function(){

  var boardContainer = document.getElementById("game-board");
  var board = new Board(boardContainer);

  board.generateSquares(10, 10, "black", "blue");
  board.draw();

  var square = board.squares[0][0]
  square.image = "cat.png";
  square.addImage("cat.png", 1);
  square.drawImage();

  board.onSquareClick = onSquareClick1;

  // board.addSavedState("save");
  //
  // board.onSquareClick = onSquareClick;

});

function onSquareClick(square){

  if(square.position.x === 8  && square.position.y === 9){
    this.addSavedState("save");
    return;
  }
  if(square.position.x === 9  && square.position.y === 9){
    this.loadSavedState("save");
    return;
  }

  square.borderColour = "orange";
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
