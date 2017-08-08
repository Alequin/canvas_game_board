window.addEventListener("load", function(){

  var canvas = document.getElementById("main-canvas");
  var board = new Board(canvas);

  board.generateSquares(15, 15, "black", "white");
  board.draw();
  board.addSavedState("save");

  board.onSquareClick = onSquareClick;

});

function onSquareClick(square){

  if(square.position.x === 13  && square.position.y === 14){
    this.addSavedState("save");
    return;
  }
  if(square.position.x === 14  && square.position.y === 14){
    this.loadSavedState("save");
    return;
  }

  // square.addImage("cat.png", 1);
  square.borderColour = "orange";
  square.draw();
}

function testReloadView(board){
  var ctx = board.context;

  var imageData = ctx.getImageData(0, 0, board.width, board.height);
  ctx.clearRect(0, 0, board.width, board.height);
  ctx.putImageData(imageData, 0, 0);
}
