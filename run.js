window.addEventListener("load", function(){

  var canvas = document.getElementById("main-canvas");
  var board = new Board(canvas);

  board.generateSquares(8,8, "black", "white");
  board.draw(1);
  board.addSavedState("save");

  board.onSquareClick = function(square){

    if(square.position.x === 7  && square.position.y === 7){
      this.loadSavedState("save");
      return;
    }

    square.addImage("cat.png");
    square.borderColour = "orange";
    square.draw(1);
  }
});
