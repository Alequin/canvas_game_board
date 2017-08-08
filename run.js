window.addEventListener("load", function(){

  var canvas = document.getElementById("main-canvas");
  var board = new Board(canvas);

  board.generateSquares(8,8, "black", "white");
  board.draw();

  // testMemoryOnSaveImage(board);

});

function onSquareClick(square){

  if(square.position.x === 7  && square.position.y === 7){
    this.loadSavedState("save");
    return;
  }

  square.addImage("cat.png", 1);
  square.borderColour = "orange";
  square.draw();
}

function testReloadView(board){
  var ctx = board.context;

  var imageData = ctx.getImageData(0, 0, board.width, board.height);
  ctx.clearRect(0, 0, board.width, board.height);
  ctx.putImageData(imageData, 0, 0);
}
