var PlayerSquare = require("./games/user_movement/player_square");

window.addEventListener("load", function(){
  var boardContainer = document.getElementById("game-board");
  var player = new PlayerSquare(boardContainer);
  player.run();
});
