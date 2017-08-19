var MovementSquare = require("./games/movement_square/movement_square");

window.addEventListener("load", function(){
  var boardContainer = document.getElementById("game-board");
  var move = new MovementSquare(boardContainer, "red", 5, 5);
  move.interval = 500;
  move.run();
});
