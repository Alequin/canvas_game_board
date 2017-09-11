var Board = require("./../../board/version2/board/board");
var Animation = require("./../../board/version2/animation/animate");
var randomInt = require("./../../other/random");

function Collison(container){

  this.board = new Board(container);
  this.board.generateSquares(10,10, "black", "white");

  this.blueSquare = this.board.getSquareByPosition(3,0);
  this.blueSquare.style.fillColour = "blue";
  this.shouldBlueMoveDown = true;
  this.yellowSquare = this.board.getSquareByPosition(4,9);
  this.yellowSquare.style.fillColour = "yellow";
  this.shouldYellowMoveDown = false;
  this.yellowDirection = -1;

  this.board.draw();

  this.tick = 0;
}

Collison.prototype.start = function(){
  const animation = new Animation(25, this.buildFrame.bind(this));
  animation.start();
}

Collison.prototype.buildFrame = function(){
  this.tick++;
  if(this.shouldBlueMoveDown){
    this.moveBlueSquareDown();
    if(!this.blueSquare.getBottom()) this.shouldBlueMoveDown = false;
  }else{
    this.moveBlueSquareUp();
    if(!this.blueSquare.getTop()) this.shouldBlueMoveDown = true;
  }
  if(this.shouldYellowMoveDown){
    this.moveYellowSquareDown();
    if(!this.yellowSquare.getBottom()) this.shouldYellowMoveDown = false;
  }else{
    this.moveYellowSquareUp();
    if(!this.yellowSquare.getTop()) this.shouldYellowMoveDown = true;
  }

}

Collison.prototype.moveBlueSquareDown = function(){
  const blueSwitchSquare = this.blueSquare.getBottom();
  this.blueSquare.switchWith(blueSwitchSquare);
  blueSwitchSquare.remove();
  this.blueSquare.remove();
  blueSwitchSquare.draw();
  this.blueSquare.draw();
}

Collison.prototype.moveBlueSquareUp = function(){
  const blueSwitchSquare = this.blueSquare.getTop();
  this.blueSquare.switchWith(blueSwitchSquare);
  blueSwitchSquare.remove();
  this.blueSquare.remove();
  blueSwitchSquare.draw();
  this.blueSquare.draw();
}

Collison.prototype.moveYellowSquareDown = function(){
  const yellowSwitchSquare = this.yellowSquare.getBottom();
  this.yellowSquare.switchWith(yellowSwitchSquare);
  yellowSwitchSquare.remove();
  this.yellowSquare.remove();
  yellowSwitchSquare.draw();
  this.yellowSquare.draw();
}

Collison.prototype.moveYellowSquareUp = function(){
  const yellowSwitchSquare = this.yellowSquare.getTop();
  this.yellowSquare.switchWith(yellowSwitchSquare);
  yellowSwitchSquare.remove();
  this.yellowSquare.remove();
  yellowSwitchSquare.draw();
  this.yellowSquare.draw();
}

module.exports = Collison;
