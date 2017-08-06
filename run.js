window.addEventListener("load", function(){

  var canvas = document.getElementById("main-canvas");
  var board = new Board(canvas);

  board.draw(5,5);

  board.getSquare(2,2).drawImage("cat.png", 1);
  board.onSquareClick = function(square){
    square.drawFill();
  };
});
