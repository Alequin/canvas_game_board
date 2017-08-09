function Square(context, coords, position, width, height, borderColour, fillColour){

  this.context = context;

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

  this.borderColour = borderColour;
  this.fillColour = fillColour;

  this.data = {};
}

Square.prototype.draw = function(imagePercentageSize){
  this.drawFill();
}

Square.prototype.drawBorder = function(){
  var holdStrokeStyle = this.context.strokeStyle;
  this.context.strokeStyle = this.borderColour;
  this.context.strokeRect(this.coordinates.x+1, this.coordinates.y+1, this.width-2, this.height-2);
  this.context.strokeStyle = holdStrokeStyle;
}

Square.prototype.drawFill = function(){
  var holdFillStyle = this.context.fillStyle;
  this.context.fillStyle = this.fillColour;
  this.context.fillRect(this.coordinates.x, this.coordinates.y, this.width, this.height);
  this.context.fillStyle = holdFillStyle;

  if(this.borderColour !== this.fillColour) this.drawBorder();
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

  newSqaure.data = this.data

  return newSqaure;
}
