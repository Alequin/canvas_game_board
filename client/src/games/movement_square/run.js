var MovementSquare = require("./movement_square");

window.addEventListener("load", function(){
  var boardContainer = document.getElementById("game-board");
  var movementSquare = new MovementSquare(boardContainer, "blue", 10, 10);
  movementSquare.run();
});
