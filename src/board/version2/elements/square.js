const copyObject = require("./../services/copy");

function makeSquareFromCorner(board, coords, position, width, height, borderColour, fillColour){
  return new Square(board, coords, position, width, height, borderColour, fillColour);
}

function makeSquareFromCenter(board, center, position, width, height, borderColour, fillColour){
  var coords = {x: center.x-width/2, y: center.y-height/2};
  return new Square(board, coords, position, width, height, borderColour, fillColour);
}

function Square(board, coords, position, width, height, borderColour, fillColour){

  this.board = board;

  this.drawContext = this.board.drawContext;
  this.imageContext = this.board.imageContext;

  this.coordinates;
  this.setCoordinates(coords);
  this.position;
  this.setPosition(position);
  this.width = width;
  this.height = height;

  this.topLeft = {x: this.coordinates.x, y: this.coordinates.y};
  this.topRight = {x: this.coordinates.x + this.width, y: this.coordinates.y};
  this.bottomLeft = {x: this.coordinates.x, y: this.coordinates.y + this.height};
  this.bottomRight = {x: this.coordinates.x + this.width, y: this.coordinates.y + this.height};

  this.center = {x: this.coordinates.x + this.width/2, y: this.coordinates.y + this.height/2}

  this.handleClick = null;
  this.handleHover = null;
  this.handleEnter = null;
  this.handleLeave = null;

  this.style = {
    image: null,
    imageSize: 1,
    borderColour: borderColour,
    fillColour: fillColour,
  }

  this.data = {};

  this.squareSpace = 1;
}

Square.prototype.draw = function(){
  this.drawFill();
  if(this.style.borderColour !== this.style.fillColour) this.drawBorder();
  if(this.style.image) this.drawImage();
}

Square.prototype.drawBorder = function(){
  var holdStrokeStyle = this.drawContext.strokeStyle;
  this.drawContext.strokeStyle = this.style.borderColour;
  this.drawContext.strokeRect(
    this.coordinates.x+this.squareSpace, this.coordinates.y+this.squareSpace,
    this.width-this.squareSpace*2, this.height-this.squareSpace*2
  );
  this.drawContext.strokeStyle = holdStrokeStyle;
}

Square.prototype.drawFill = function(){
  var holdFillStyle = this.drawContext.fillStyle;
  this.drawContext.fillStyle = this.style.fillColour;
  this.drawContext.fillRect(
    this.coordinates.x+this.squareSpace, this.coordinates.y+this.squareSpace,
    this.width-this.squareSpace*2, this.height-this.squareSpace*2
  );
  this.drawContext.fillStyle = holdFillStyle;
}

Square.prototype.drawImage = function(){

  var calcPosition = function(coord, length, percentageSize){
    var diff = (coord + length/2) - coord;
    return coord + (diff * (1-percentageSize));
  }

  var x = calcPosition(this.coordinates.x, this.width, this.style.imageSize);
  var y = calcPosition(this.coordinates.y, this.height, this.style.imageSize);

  var width = this.width * this.style.imageSize;
  var height = this.height * this.style.imageSize;

  var onLoadImage = function(){
    this.imageContext.drawImage(this.style.image, x, y, width, height);
  }.bind(this);

  this.style.image.addEventListener("load", onLoadImage);
}

Square.prototype.addImage = function(imageLink, percentageSize){
  this.style.image = document.createElement("img");
  this.style.image.src = imageLink;
  this.style.imageSize = percentageSize;
}

Square.prototype.remove = function(){
  this.removeDrawn();
  this.removeImage();
}

Square.prototype.removeDrawn = function(){
  var space = this.squareSpace/2;
  this.drawContext.clearRect(
    this.coordinates.x, this.coordinates.y,
    this.width, this.height
  );
}

Square.prototype.removeImage = function(){
  this.imageContext.clearRect(
    this.coordinates.x+this.squareSpace, this.coordinates.y+this.squareSpace,
    this.width-this.squareSpace*2, this.height+this.squareSpace*2
  );
}

Square.prototype.setPosition = function(position){
  const keys = Object.keys(position);
  if(keys[0] !== "column" && keys[1] !== "row"){
    throw "Incorrect keys on given object. Key 1 must be column. Key 2 must be row."
  }
  this.position = copyObject(position);
}

Square.prototype.setCoordinates = function(coordinates){
  const keys = Object.keys(coordinates);
  if(keys[0] !== "x" && keys[1] !== "y"){
    throw "Incorrect keys on given object. Key 1 must be . Key 2 must be y."
  }
  this.coordinates = copyObject(coordinates);

  this.topLeft = {x: this.coordinates.x, y: this.coordinates.y};
  this.topRight = {x: this.coordinates.x + this.width, y: this.coordinates.y};
  this.bottomLeft = {x: this.coordinates.x, y: this.coordinates.y + this.height};
  this.bottomRight = {x: this.coordinates.x + this.width, y: this.coordinates.y + this.height};

  this.center = {x: this.coordinates.x + this.width/2, y: this.coordinates.y + this.height/2}
}

Square.prototype.isWithin = function(x, y){
  return !(x < this.topLeft.x || x >= this.topRight.x) &&
        !(y < this.topLeft.y || y >= this.bottomLeft.y);
}

Square.prototype.getTop = function(amount){
  amount = this.manageOffset(amount);
  return this.board.getSquareByPosition(this.position.column, this.position.row-amount);
};

Square.prototype.getBottom = function(amount){
  amount = this.manageOffset(amount);
  return this.board.getSquareByPosition(this.position.column, this.position.row+amount);
};

Square.prototype.getLeft = function(amount){
  amount = this.manageOffset(amount);
  return this.board.getSquareByPosition(this.position.column-amount, this.position.row);
};

Square.prototype.getRight = function(amount){
  amount = this.manageOffset(amount);
  return this.board.getSquareByPosition(this.position.column+amount, this.position.row);
};

Square.prototype.getTopLeft = function(amount){
  amount = this.manageOffset(amount);
  return this.board.getSquareByPosition(this.position.column-amount, this.position.row-amount);
};

Square.prototype.getTopRight = function(amount){
  amount = this.manageOffset(amount);
  return this.board.getSquareByPosition(this.position.column+amount, this.position.row-amount);
};

Square.prototype.getBottomLeft = function(amount){
  amount = this.manageOffset(amount);
  return this.board.getSquareByPosition(this.position.column-amount, this.position.row+amount);
};

Square.prototype.getBottomRight = function(amount){
  amount = this.manageOffset(amount);
  return this.board.getSquareByPosition(this.position.column+amount, this.position.row+amount);
};

Square.prototype.manageOffset = function(amount){
  if(amount || amount === 0) return amount;
  return 1;
}

Square.prototype.switchWith = function(squareToSwitch){
  this.board.switchSquares(this, squareToSwitch);
}

Square.prototype.copy = function(){

  var newSquare = new Square(
    this.board,
    this.coordinates,
    this.position,
    this.width,
    this.height,
    null,
    null
  );

  newSquare.onClick = this.handleClick;
  newSquare.onHover = this.onHover;
  newSquare.onEnter = this.onEnter;
  newSquare.onLeave = this.handleLeave;

  newSquare.style.image = this.style.image;
  newSquare.style.imageSize = this.style.imageSize;
  newSquare.style.fillColour = this.style.fillColour;
  newSquare.style.borderColour = this.style.borderColour;

  newSquare.data = copyObject(this.data);

  return newSquare;
}

module.exports = Square;
