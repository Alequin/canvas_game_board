window.addEventListener("load", function(){

  var canvas = document.getElementById("main-canvas");
  var board = new Board(canvas);

  board.generateSquares(8,8, "black", "black");
  board.draw();

  board.onSquareClick = function(square){
    var x = square.position.x;
    var y = square.position.y;
    console.log(x+"/"+y);
    var topSquare = this.getSquareAbove(2, x, y);
    var bottomSquare = this.getSquareBelow(2, x, y);
    var rightSquare = this.getSquareToRight(2, x, y);
    var leftSquare = this.getSquareToLeft(2, x, y);
    console.log(topSquare.position.x+"/"+topSquare.position.y);
    topSquare.drawFill();
    bottomSquare.drawFill();
    rightSquare.drawFill();
    leftSquare.drawFill();
  }
});
