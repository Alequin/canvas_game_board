window.addEventListener("load", function(){

  var canvas = document.getElementById("main-canvas");
  var board = new Board(canvas);

  board.setColour("red");
  board.draw(10, 10);
  board.onSquareClick = function(square){
    console.log(square.center);
    square.drawFill();
  };
});
