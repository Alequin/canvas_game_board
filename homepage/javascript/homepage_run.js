const Board = require("./../../src/board/version1/board.js");

window.addEventListener("load", function(){

  const cavansDivs = document.getElementsByClassName("canvas");

  const leftBoard = new Board(cavansDivs[0]);
  const rightBoard = new Board(cavansDivs[0]);

  leftBoard.generateSquares(2, 10, "transparent", "#ff6200");
  rightBoard.generateSquares(2, 10, "transparent", "#ff6200");

  leftBoard.draw();
  rightBoard.draw();
});
