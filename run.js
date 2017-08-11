window.addEventListener("load", function(){

  var boardContainer = document.getElementById("game-board");
  var board = new Board(boardContainer);

  // board.generateSquares(10, 10, "black", "white");

  var square1 = makeSqaureFromCenter(board.drawContext, board.imageContext, {x: 250, y: 250}, {x: 0, y: 0}, 50, 50, "black", "white")
  console.log(square1);

  var row = [];
  row.push(square1);
  board.squares.push(row);

  board.draw();

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

  square.data.borderColour = "orange";
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
