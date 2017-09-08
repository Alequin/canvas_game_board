var FallingSquares = require("./falling_squares");

window.addEventListener("load", function(){
  var boardContainer = document.getElementById("game-board");

  var colour = {
    borderColour: "black",
    fillColour: "white",
    fallingSquareColour: "yellow"
  }

  var fallingSquares = new FallingSquares(boardContainer, 10, 10, 10, 2, colour);
  fallingSquares.run();
});
