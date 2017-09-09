const Board = require("./../../board/version1/board");
const Animation = require("./../../board/version1/animate");

const swordImg = "./../images/sword.png"

function PlayerSquare(container){

  this.board = new Board(container);
  this.board.generateSquares(10, 10, "black", "white");

  this.playerColour = "red";
  this.currentSquare = this.board.getSquareByPosition(0,0);
  this.currentSquare.addImage(swordImg, 0.8);
  this.currentSquare.style.borderColour = this.playerColour;

  this.board.draw();
}

PlayerSquare.prototype.run = function(){
  this.initMovements();
  console.log("out");
}

PlayerSquare.prototype.initMovements = function(){
  this.board.clickLayer.setAttribute("tabindex", "1");
  this.board.clickLayer.focus();
  this.board.clickLayer.addEventListener("keydown", function(event){
    var keyPress = event.key;
    console.log(keyPress);
    switch(keyPress){
      case "ArrowUp":
        this.moveUp();
      break;
      case "ArrowLeft":
        this.moveLeft();
      break;
      case "ArrowRight":
        this.moveRight();
      break;
      case "ArrowDown":
        this.moveDown();
      break;
    }
  }.bind(this));
}

PlayerSquare.prototype.moveUp = function(){
  var nextSquare = this.board.getSquareTop(this.currentSquare.position.column, this.currentSquare.position.row);
  this.move(nextSquare);
}

PlayerSquare.prototype.moveLeft = function(){
  var nextSquare = this.board.getSquareLeft(this.currentSquare.position.column, this.currentSquare.position.row);
  this.move(nextSquare);
}

PlayerSquare.prototype.moveRight = function(){
  console.log("column: ", this.currentSquare.position.column);
  console.log("row: ", this.currentSquare.position.row);
  var nextSquare = this.board.getSquareRight(this.currentSquare.position.column, this.currentSquare.position.row);
  this.move(nextSquare);
}

PlayerSquare.prototype.moveDown = function(){
  var nextSquare = this.board.getSquareBottom(this.currentSquare.position.column, this.currentSquare.position.row);
  this.move(nextSquare);
}

PlayerSquare.prototype.move = function(nextSquare){
  if(nextSquare){
    this.currentSquare.remove();
    nextSquare.remove();

    this.currentSquare.style.borderColour = "black";
    nextSquare.style.borderColour = this.playerColour;
    this.currentSquare.style.image = null;
    nextSquare.addImage(swordImg, 0.8);

    this.currentSquare.draw();
    nextSquare.draw();

    this.currentSquare = nextSquare;
  }
}

module.exports = PlayerSquare;
