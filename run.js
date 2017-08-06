window.addEventListener("load", function(){

  var canvas = document.getElementById("main-canvas");
  var board = new Board(canvas);

  board.generateSquares(50,50, "black", "white");
  board.draw();

  board.onSquareClick = function(square){
    square.fillColour = "red";
    square.drawFill();
  }
});
