var PlayerSquare = require("./player_square");

window.addEventListener("load", function(){
  var boardContainer = document.getElementById("game-board");
  var player = new PlayerSquare(boardContainer);
  player.run();
});
