var MovementSquare = require("./movement_square/movement_square");

window.addEventListener("load", function(){
  var move = new MovementSquare("red", 5, 5);
  move.time = 500;
  move.run();
});
