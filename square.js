function Square(context, x, y, width, height, borderColour, fillColour){

  this.context = context;
  this.position = {x: x, y: y};
  this.width = width;
  this.height = height;

  this.topLeft = {x: x, y: y};
  this.topRight = {x: x + width, y: y};
  this.bottomLeft = {x: x, y: y + height};
  this.bottomRight = {x: x + width, y: y + height};

  this.center = {x: x + width/2, y: y + height/2}

  this.borderColour = borderColour;
  this.fillColour = fillColour;
}

Square.prototype.drawEmpty = function(){
  var holdStrokeStyle = this.context.fillStyle;
  this.context.strokeStyle = this.borderColour;
  this.context.strokeRect(this.position.x, this.position.y, this.width, this.height);
  this.context.strokeStyle = holdStrokeStyle;
}

Square.prototype.drawFill = function(){
  var holdFillStyle = this.context.fillStyle;
  this.context.fillStyle = this.fillColour;
  this.context.fillRect(this.position.x, this.position.y, this.width, this.height);
  this.context.fillStyle = holdFillStyle;
  this.drawEmpty();
}

Square.prototype.remove = function(){
  this.context.clearRect(this.position.x, this.position.y, this.width, this.height);
}

Square.prototype.isWithin = function(x, y){
  return !(x < this.topLeft.x || x >= this.topRight.x) &&
        !(y < this.topLeft.y || y >= this.bottomLeft.y);
}

Square.prototype.drawImage = function(imageLink, percentageSize){

  image = document.createElement("img");
  image.src = imageLink;

  var calcPosition = function(coord, length, percentageSize){
    var diff = (coord + length/2) - coord;
    return coord + (diff * (1-percentageSize));
  }

  var x = calcPosition(this.position.x, this.width, percentageSize);
  var y = calcPosition(this.position.y, this.height, percentageSize);

  var width = this.width * percentageSize;
  var height = this.height * percentageSize;

  var onLoadImage = function(){
    this.context.drawImage(image, x, y, width, height);
  }.bind(this);

  image.addEventListener("load", onLoadImage);
}

Square.prototype.removeImage = function(){
  image = document.createElement("img");
  image.style.background = "white";
  this.context.drawImage(image, this.position.x, this.position.y, this.width, this.height);
}
