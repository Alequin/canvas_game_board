window.addEventListener("load", function(){

  var canvas = document.getElementById("main-canvas");
  var board = new Board(canvas);

  board.draw(2,2);
  board.onSquareClick = function(square){
    square.drawImage("cat.png", 1);
  };
});
