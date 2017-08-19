var Board = require("./../../board/board");
var Animation = require("./../../animate/animate");
var randomInt = require("./../../other/random");

function MovementSquare(container, colour, width, height){
  this.board = new Board(container);

  this.board.generateSquares(width, height, "black", "white");
  this.currentSquare = null;

  this.colour = colour;
}

MovementSquare.prototype.run = function(){
  this.prepareSquare();
  this.startAnimation();
}

MovementSquare.prototype.startAnimation = function(){
  this.startTime = Date.now();
  var animation = new Animation(2, this.moveSquare.bind(this));
  animation.start();
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
