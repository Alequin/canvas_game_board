window.addEventListener("load", function(){

  var canvas = document.getElementById("main-canvas");
  var board = new Board(canvas);

  board.draw(10, 10);
  board.onSquareClick = function(square){
    console.log("Clicked: " + square.position.x + "/" + square.position.y);
    square.drawFill();
  };

});
