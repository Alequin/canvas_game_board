var FallingSquares = require("./games/falling_squares/falling_squares");

window.addEventListener("load", function(){
  var boardContainer = document.getElementById("game-board");
  var fall = new FallingSquares(boardContainer);
  fall.run();
});
