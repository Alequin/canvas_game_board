
const Collison = require("./Collison");

window.addEventListener("load", function(){
  const boardContainer = document.getElementById("game-board");
  const collison = new Collison(boardContainer);
  collison.start();
});
