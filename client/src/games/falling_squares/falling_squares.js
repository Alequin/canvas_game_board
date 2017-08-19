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

  this.fallingSquareColour = "yellow";
  this.maxFalling = 10;
  this.currentFalling = 0;
  this.fallingSquares = [];
}

FallingSquares.prototype.run = function(){
  for(var j=0; j<this.maxFalling; j++){
    this.fallingSquares.push(null);
  }
  this.startAnimation();
}

FallingSquares.prototype.startAnimation = function(){
  this.startTime = Date.now();
  var animation = new Animation(2, this.prepareFrame.bind(this));
  animation.start();
}

FallingSquares.prototype.prepareFrame = function(){
  for(var index in this.fallingSquares){
    if(this.fallingSquares[index]) this.moveSquareDown(index);
  }

  if(this.currentFalling < this.maxFalling){
    var newSquare = this.addNewSquare();
    this.currentFalling++;
  }
}

FallingSquares.prototype.addNewSquare = function(){
  var columnIndex = randomInt(0, this.width-1);
  var newSquare = this.board.getSquareByPosition(columnIndex, 0);

  for(var index in this.fallingSquares){
    if(!this.fallingSquares[index]){
      this.fallingSquares[index] = newSquare;
      break;
    }
  }

  newSquare.style.fillColour = this.fallingSquareColour;
  newSquare.draw();
}

FallingSquares.prototype.moveSquareDown = function(index){
  var square = this.fallingSquares[index];
  var nextSquare = this.board.getSquareBottom(1, square.position.x, square.position.y);

  if(!nextSquare){
    this.removeSquare(index);
    return;
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
  this.fallingSquares[index] = null;
  this.currentFalling--;
  
  square.style.fillColour = "white";
  square.removeDrawn();
  square.draw();
}

module.exports = FallingSquares;
