window.addEventListener("load", function(){

  var canvas = document.getElementById("main-canvas");
  var board = new Board(canvas);

  board.draw(10, 10);
  board.onSquareClick = function(square){
    square.drawImage("cat.png", 0.5);
  };
});
