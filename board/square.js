function makeSqaureFromCorner(board, coords, position, width, height, borderColour, fillColour){
  return new Square(board, coords, position, width, height, borderColour, fillColour);
}

function makeSqaureFromCenter(board, center, position, width, height, borderColour, fillColour){
  var coords = {x: center.x-width/2, y: center.y-height/2};
  return new Square(board, coords, position, width, height, borderColour, fillColour);
}

function Square(board, coords, position, width, height, borderColour, fillColour){

  this.drawContext = board.drawContext;
  this.imageContext = board.imageContext;

  coords.x = Math.floor(coords.x);
  coords.y = Math.floor(coords.y);

  this.coordinates = coords;
  this.position = position;
  this.width = width;
  this.height = height;

  this.topLeft = {x: coords.x, y: coords.y};
  this.topRight = {x: coords.x + width, y: coords.y};
  this.bottomLeft = {x: coords.x, y: coords.y + height};
  this.bottomRight = {x: coords.x + width, y: coords.y + height};

  this.center = {x: coords.x + width/2, y: coords.y + height/2}

  var emptyFunction = function(){};

  this.onClick = emptyFunction;
  this.onHover = emptyFunction;
  this.onEnter = emptyFunction;
  this.onLeave = emptyFunction;

  this.style = {
    image: null,
    imageSize: 1,
    borderColour: borderColour,
    fillColour: fillColour,
  }

  this.data = {};

  this.squareSpace = 1.25;
}

Square.prototype.draw = function(){
  this.drawFill();
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

  if(this.style.borderColour !== this.style.fillColour) this.drawBorder();
}

Square.prototype.drawImage = function(){

  this.imageTag = document.createElement("img");

  var calcPosition = function(coord, length, percentageSize){
    var diff = (coord + length/2) - coord;
    return coord + (diff * (1-percentageSize));
  }

  var x = calcPosition(this.coordinates.x, this.width, this.style.imageSize);
  var y = calcPosition(this.coordinates.y, this.height, this.style.imageSize);

  var width = this.width * this.style.imageSize;
  var height = this.height * this.style.imageSize;

  var onLoadImage = function(){
    this.imageContext.drawImage(this.imageTag, x, y, width, height);
    this.imageTag = undefined;
  }.bind(this);
  this.imageTag.src = this.style.image;

  this.imageTag.addEventListener("load", onLoadImage);
}

Square.prototype.addImage = function(imageLink, percentageSize){
  this.style.image = imageLink;
  this.style.imageSize = percentageSize;
}

Square.prototype.remove = function(){
  this.removeDrawn();
  this.removeImage();
}

Square.prototype.removeDrawn = function(){
  this.drawContext.clearRect(
    this.coordinates.x+squareSpace, this.coordinates.y+squareSpace,
    this.width-squareSpace*2, this.height+squareSpace*2
  );
}

Square.prototype.removeImage = function(){
  this.imageContext.clearRect(
    this.coordinates.x+squareSpace, this.coordinates.y+squareSpace,
    this.width-squareSpace*2, this.height+squareSpace*2
  );
}

Square.prototype.isWithin = function(x, y){
  return !(x < this.topLeft.x || x >= this.topRight.x) &&
        !(y < this.topLeft.y || y >= this.bottomLeft.y);
}

Square.prototype.clone = function(){
  var newSqaure = new Square(
    this.drawContext,
    this.imageContext,
    this.coordinates,
    this.position,
    this.width,
    this.height,
    this.style.borderColour,
    this.style.fillColour
  );

  newSqaure.data = this.cloneData(this.data);

  return newSqaure;
}

Square.prototype.cloneData = function(data){
  var newData = {};
  for(var key of Object.keys(data)){
    newData[key] = data[key];
  }
  return newData;
}
