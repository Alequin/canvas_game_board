var MovementSquare = require("./random_movement");

window.addEventListener("load", function(){
  var move = new MovementSquare("red", 20, 20);
  move.time = 1000;
  move.run();
});
