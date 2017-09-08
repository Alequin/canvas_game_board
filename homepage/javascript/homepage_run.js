const FallingSquares = require("./../../src/games/falling_squares/falling_squares.js");

window.addEventListener("load", function(){

  const cavansDivs = document.getElementsByClassName("canvas");

  var colour = {
    borderColour: "transparent",
    fillColour: "transparent",
    fallingSquareColour: "#ff6200",
  }

  const leftBoard = new FallingSquares(cavansDivs[0], 4, 10, 15, 2, colour);
  const rightBoard = new FallingSquares(cavansDivs[1], 4, 10, 15, 2, colour);

  leftBoard.run();
  rightBoard.run();
});
