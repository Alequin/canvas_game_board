window.addEventListener("load", function(){

  var canvas = document.getElementById("main-canvas");
  var board = new Board(canvas);

  board.draw(10, 10);

  var square = board.getSqaureByCoords(250, 500);
  square.drawFill();

});
