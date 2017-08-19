var Board = require("./../board/board");
var randomInt = require("./../other/random");

function MovementSquare(colour, width, height){
  var boardContainer = document.getElementById("game-board");
  this.board = new Board(boardContainer);

  this.board.generateSquares(width, height, "black", "white");
  this.currentSquare = null;

  this.colour = colour;

  this.interval = 25;
  this.startTime = null;
  this.elapsed = null;
}

MovementSquare.prototype.run = function(){
  this.prepareSquare();
  this.startAnimation();
}

MovementSquare.prototype.startAnimation = function(){
  this.startTime = Date.now();
  requestAnimationFrame(this.animate.bind(this));
}

MovementSquare.prototype.animate = function(){

  var now = Date.now();
  elapsed = now - this.startTime;
  if(elapsed >= this.interval){
    this.startTime = now;
    this.moveSquare();
  }
  requestAnimationFrame(this.animate.bind(this));
}

MovementSquare.prototype.prepareSquare = function(){
  this.currentSquare = this.board.getSquareByPosition(0,0);
  this.currentSquare.style.fillColour = this.colour;
  this.board.draw();
}

MovementSquare.prototype.moveSquare = function(){
  var nextSquare = this.getNextSquare();

  this.currentSquare.style.fillColour = "white";
  nextSquare.style.fillColour = this.colour;

  this.currentSquare.remove();
  nextSquare.remove();

  this.currentSquare.draw();
  nextSquare.draw();

  this.currentSquare = nextSquare;
}

MovementSquare.prototype.getNextSquare = function(){

  var nextSquare = null;

  var x = this.currentSquare.position.x;
  var y = this.currentSquare.position.y

  while(!nextSquare){
    switch(randomInt(0, 3)){
      case 0:
        nextSquare = this.board.getSquareTop(1, x, y);
      break;
      case 1:
        nextSquare = this.board.getSquareLeft(1, x, y);
      break;
      case 2:
        nextSquare = this.board.getSquareBottom(1, x, y);
      break;
      case 3:
        nextSquare = this.board.getSquareRight(1, x, y);
      break;
    }
  }

  return nextSquare;
}

module.exports = MovementSquare;
