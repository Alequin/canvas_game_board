window.addEventListener("load", function(){

  var canvas = document.getElementById("main-canvas");
  var board = new Board(canvas);

  board.generateSquares(8,8, "black", "black");
  board.draw();

  board.onSquareClick = function(square){
    var x = square.position.x;
    var y = square.position.y;
    console.log(x+"/"+y);
    var topSquare = this.getSquareTop(1, x, y);
    if(topSquare !== null){
      topSquare.drawFill();
    }
  }
});
