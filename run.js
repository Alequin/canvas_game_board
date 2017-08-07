window.addEventListener("load", function(){

  var canvas = document.getElementById("main-canvas");
  var board = new Board(canvas);

  board.generateSquares(8,8, "black", "black");
  board.draw();

  board.onSquareClick = function(square){
    square.addImage("cat.png");
    square.borderColour = "orange";
    square.fillColour = "blue";
    square.draw(1);
  }
});
