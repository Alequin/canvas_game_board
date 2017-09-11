var Board = require("./../../board/version2/board/board");
var Animation = require("./../../board/version2/animation/animate");
var randomInt = require("./../../other/random");

function Collison(container){

  this.board = new Board(container);
  this.board.generateSquares(10,10, "black", "white");

  this.blueSquare = this.board.getSquareByPosition(3,0);
  this.blueSquare.style.fillColour = "blue";
  this.blueSquare.data.speed = 2;
  this.blueSquare.data.type = "wall";
  this.shouldBlueMoveDown = true;
  this.yellowSquare = this.board.getSquareByPosition(3,9);
  this.yellowSquare.style.fillColour = "yellow";
  this.yellowSquare.data.speed = 5;
  this.yellowSquare.data.type = "wall";
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
    const bottom = this.blueSquare.getBottom();
    if(!bottom || bottom.data.type === "wall") {
      this.shouldBlueMoveDown = false;
    }else{
      if(this.tick % this.blueSquare.data.speed === 0){
        this.moveBlueSquareDown();
      }
    }
  }else{
    if(!this.blueSquare.getTop()) {
      this.shouldBlueMoveDown = true;
    }else{
      if(this.tick % this.blueSquare.data.speed === 0){
        this.moveBlueSquareUp();
      }
    }
  }

  if(this.shouldYellowMoveDown){
  if(!this.yellowSquare.getBottom()) {
    this.shouldYellowMoveDown = false;
  }else{
    if(this.tick % this.yellowSquare.data.speed === 0){
      this.moveYellowSquareDown();
    }
  }
  }else{
    const top = this.yellowSquare.getTop();
    if(!top || top.data.type === "wall"){
      this.shouldYellowMoveDown = true;
    } else{
      if(this.tick % this.yellowSquare.data.speed === 0){
        this.moveYellowSquareUp();
      }
    }
  }
}

Collison.prototype.moveBlueSquareDown = function(){
  const blueSwitchSquare = this.blueSquare.getBottom();
  this.switchAndDrawSquares(this.blueSquare, blueSwitchSquare);
}

Collison.prototype.moveBlueSquareUp = function(){
  const blueSwitchSquare = this.blueSquare.getTop();
  this.switchAndDrawSquares(this.blueSquare, blueSwitchSquare);
}

Collison.prototype.moveYellowSquareDown = function(){
  const yellowSwitchSquare = this.yellowSquare.getBottom();
  this.switchAndDrawSquares(this.yellowSquare, yellowSwitchSquare);
}

Collison.prototype.moveYellowSquareUp = function(){
  const yellowSwitchSquare = this.yellowSquare.getTop();
  this.switchAndDrawSquares(this.yellowSquare, yellowSwitchSquare);
}

Collison.prototype.switchAndDrawSquares = function(square1, square2){
  square1.switchWith(square2);
  square1.remove();
  square2.remove();
  square1.draw();
  square2.draw();
}

module.exports = Collison;
