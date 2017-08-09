window.addEventListener("load", function(){

  var boardContainer = document.getElementById("game-board");
  var board = new Board(boardContainer);

  // board.generateSquares(10, 10, "black", "white");
  // board.draw();
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

function testReloadView(board){
  var ctx = board.context;

  var imageData = ctx.getImageData(0, 0, board.width, board.height);
  ctx.clearRect(0, 0, board.width, board.height);
  ctx.putImageData(imageData, 0, 0);
}
