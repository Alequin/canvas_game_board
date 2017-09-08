var FallingSquares = require("./falling_squares");

window.addEventListener("load", function(){
  var boardContainer = document.getElementById("game-board");
  var fallingSquares = new FallingSquares(boardContainer);
  fallingSquares.run();
});
