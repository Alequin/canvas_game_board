function Square(context, coords, position, width, height, borderColour, fillColour){

  this.context = context;
  this.coordinates = coords;
  this.position = position;
  this.width = width;
  this.height = height;

  this.topLeft = {x: coords.x, y: coords.y};
  this.topRight = {x: coords.x + width, y: coords.y};
  this.bottomLeft = {x: coords.x, y: coords.y + height};
  this.bottomRight = {x: coords.x + width, y: coords.y + height};

  this.center = {x: coords.x + width/2, y: coords.y + height/2}

  this.borderColour = borderColour;
  this.fillColour = fillColour;

  this.image = null;
}

Square.prototype.drawEmpty = function(){
  var holdStrokeStyle = this.context.fillStyle;
  this.context.strokeStyle = this.borderColour;
  this.context.strokeRect(this.coordinates.x, this.coordinates.y, this.width, this.height);
  this.context.strokeStyle = holdStrokeStyle;
}

Square.prototype.drawFill = function(){
  var holdFillStyle = this.context.fillStyle;
  this.context.fillStyle = this.fillColour;
  this.context.fillRect(this.coordinates.x, this.coordinates.y, this.width, this.height);
  this.context.fillStyle = holdFillStyle;

  if(this.borderColour !== this.fillColour) this.drawEmpty();
}

Square.prototype.drawImage = function(percentageSize){

  image = document.createElement("img");
  image.src = this.image;

  var calcPosition = function(coord, length, percentageSize){
    var diff = (coord + length/2) - coord;
    return coord + (diff * (1-percentageSize));
  }

  var x = calcPosition(this.coordinates.x, this.width, percentageSize);
  var y = calcPosition(this.coordinates.y, this.height, percentageSize);

  var width = this.width * percentageSize;
  var height = this.height * percentageSize;

  var onLoadImage = function(){
    this.context.drawImage(image, x, y, width, height);
  }.bind(this);

  image.addEventListener("load", onLoadImage);
}

Square.prototype.addImage = function(imageLink){
  this.image = imageLink;
}

Square.prototype.remove = function(){
  this.context.clearRect(this.coordinates.x, this.coordinates.y, this.width, this.height);
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

  return newSqaure;
}
