window.addEventListener("load", function(){

  var canvas = document.getElementById("main-canvas");
  var board = new Board(canvas);

  board.generateSquares(8,8, "black", "black");
  board.draw();

  board.onSquareClick = function(square){
    var x = square.position.x;
    var y = square.position.y-1;
    var topSquare = this.getSquare(x, y);

    topSquare.drawFill();
  }
});
