var MovementSquare = require("./random_movement");

window.addEventListener("load", function(){
  var move = new MovementSquare("red");
  move.run();
});
