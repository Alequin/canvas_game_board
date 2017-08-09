function Square(drawContext, imageContext, coords, position, width, height, borderColour, fillColour){

  this.drawContext = drawContext;
  this.imageContext = imageContext;

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

  this.image = null;
  this.imageSize = 1;
  this.borderColour = borderColour;
  this.fillColour = fillColour;

  this.data = {};
}

Square.prototype.draw = function(){
  this.drawFill();
  if(this.image) drawImage();
}

Square.prototype.drawBorder = function(){
  var holdStrokeStyle = this.drawContext.strokeStyle;
  this.drawContext.strokeStyle = this.borderColour;
  this.drawContext.strokeRect(this.coordinates.x+1, this.coordinates.y+1, this.width-2, this.height-2);
  this.drawContext.strokeStyle = holdStrokeStyle;
}

Square.prototype.drawFill = function(){
  var holdFillStyle = this.drawContext.fillStyle;
  this.drawContext.fillStyle = this.fillColour;
  this.drawContext.fillRect(this.coordinates.x+1, this.coordinates.y+1, this.width-2, this.height-2);
  this.drawContext.fillStyle = holdFillStyle;

  if(this.borderColour !== this.fillColour) this.drawBorder();
}

Square.prototype.drawImage = function(){

  image = document.createElement("img");
  image.src = this.image;

  var calcPosition = function(coord, length, percentageSize){
    var diff = (coord + length/2) - coord;
    return coord + (diff * (1-percentageSize));
  }

  var x = calcPosition(this.coordinates.x, this.width, this.imageSize);
  var y = calcPosition(this.coordinates.y, this.height, this.imageSize);

  var width = this.width * this.imageSize;
  var height = this.height * this.imageSize;

  var onLoadImage = function(){
    this.imageContext.drawImage(image, x, y, width, height);
  }.bind(this);

  image.addEventListener("load", onLoadImage);
}

Square.prototype.addImage = function(imageLink, percentageSize){
  this.image = imageLink;
  this.imageSize = percentageSize;
}

Square.prototype.remove = function(){
  this.drawContext.clearRect(this.coordinates.x+1, this.coordinates.y+1, this.width-2, this.height-2);
  this.imageContext.clearRect(this.coordinates.x+1, this.coordinates.y+1, this.width-2, this.height-2);
}

Square.prototype.isWithin = function(x, y){
  return !(x < this.topLeft.x || x >= this.topRight.x) &&
        !(y < this.topLeft.y || y >= this.bottomLeft.y);
}

Square.prototype.clone = function(){
  var newSqaure = new Square(
    this.context,
    this.coordinates,
    this.position,
    this.width,
    this.height,
    this.borderColour,
    this.fillColour
  );

  newSqaure.data = this.data

  return newSqaure;
}
