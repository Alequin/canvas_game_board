var Board = require("./../../board/version1/board");
var Animation = require("./../../board/version1/animate");
var randomInt = require("./../../other/random");

function FallingSquares(container, width, height, maxFalling, fps, colour){
  this.board = new Board(container);

  this.width = width;
  this.height = height;
  this.board.generateSquares(this.width, this.height, colour.borderColour, colour.fillColour);
  this.board.draw();

  this.fps = fps;

  this.fallingSquareColour = colour.fallingSquareColour;
  this.maxFalling = maxFalling;
  this.currentFalling = 0;
  this.fallingSquares = [];
}

FallingSquares.prototype.run = function(){
  this.startAnimation();
}

FallingSquares.prototype.startAnimation = function(){
  this.startTime = Date.now();
  var animation = new Animation(this.fps, this.prepareFrame.bind(this));
  animation.start();
}

FallingSquares.prototype.prepareFrame = function(){
  for(var index in this.fallingSquares){
    if(this.fallingSquares[index]) this.moveSquareDown(index);
  }

  if(this.currentFalling < this.maxFalling){
    var newSquare = this.getNewSquare();
    this.fallingSquares.push(newSquare);
    this.currentFalling++;
    newSquare.style.fillColour = this.fallingSquareColour;
    newSquare.draw();
  }
}

FallingSquares.prototype.getNewSquare = function(){
  var columnIndex = randomInt(0, this.width-1);
  var newSquare = this.board.getSquareByPosition(columnIndex, 0);
  return newSquare;
}

FallingSquares.prototype.moveSquareDown = function(index){
  var square = this.fallingSquares[index];
  var nextSquare = this.board.getSquareBottom(square.position.column, square.position.row);

  if(!nextSquare){
    nextSquare = this.getNewSquare();
  }

  square.remove();
  nextSquare.remove();

  square.style.fillColour = "white";
  nextSquare.style.fillColour = this.fallingSquareColour;

  square.drawBorder();
  nextSquare.draw();

  this.fallingSquares[index] = nextSquare;
}

FallingSquares.prototype.removeSquare = function(index){
  var square = this.fallingSquares[index];
  this.fallingSquares[index] = null;
  this.currentFalling--;

  square.style.fillColour = "white";
  square.removeDrawn();
  square.draw();
}

module.exports = FallingSquares;
