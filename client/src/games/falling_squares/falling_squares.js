var Board = require("./../../board/board");
var Animation = require("./../../animate/animate");
var randomInt = require("./../../other/random");

function FallingSquares(container){
  var boardContainer = document.getElementById("game-board");
  this.board = new Board(boardContainer);

  this.width = 10;
  this.height = 10;
  this.board.generateSquares(this.width, this.height, "black", "white");
  this.board.draw();

  this.maxFalling = 3;
  this.fallingSquares = [];
}

FallingSquares.prototype.run = function(){
  this.startAnimation();
}

FallingSquares.prototype.startAnimation = function(){
  this.startTime = Date.now();
  var animation = new Animation(2, this.prepareFrame.bind(this));
  animation.start();
}

FallingSquares.prototype.prepareFrame = function(){
  for(var index in this.fallingSquares){
    this.moveSquareDown(index);
  }

  var currentFalling = this.fallingSquares.length;
  if(currentFalling < this.maxFalling){
    var newSquare = this.getNewSquare();
    this.fallingSquares.push(newSquare);
    newSquare.style.fillColour = "yellow";
    newSquare.draw();
  }
}

FallingSquares.prototype.getNewSquare = function(){
  var columnIndex = randomInt(0, this.width-1);
  return this.board.getSquareByPosition(columnIndex, 0);
}

FallingSquares.prototype.moveSquareDown = function(index){
  var square = this.fallingSquares[index];
  var nextSquare = this.board.getSquareBottom(1, square.position.x, square.position.y);

  square.remove();
  nextSquare.remove();

  square.style.fillColour = "white";
  nextSquare.style.fillColour = "yellow";

  square.drawBorder();
  nextSquare.draw();

  this.fallingSquares[index] = nextSquare;
}

module.exports = FallingSquares;
