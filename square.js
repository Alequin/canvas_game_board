function Square(context, x, y, width, height){

  this.context = context;
  this.position = {x: x, y: y};
  this.width = width;
  this.height = height;

  this.topLeft = {x: x, y: y};
  this.topRight = {x: x + width, y: y};
  this.bottomLeft = {x: x, y: y + height};
  this.bottomRight = {x: x + width, y: y + height};

  this.center = {x: x + width/2, y: y + height/2}

}

Square.prototype.prepareEmpty = function(){
  this.prepare("empty");
}

Square.prototype.drawEmpty = function(){
  this.prepareEmpty(this.context);
  this.context.stroke();
}

Square.prototype.prepareFill = function(){
  this.prepare("fill");
}

Square.prototype.drawFill = function(){
  this.prepareFill(this.context);
  this.context.stroke();
}

Square.prototype.prepare = function(method){

  var inputs = {
    x: this.position.x,
    y: this.position.y,
    width: this.width,
    height: this.height,
  }
  switch (method) {
    case "empty":
      this.context.rect(inputs.x, inputs.y, inputs.width, inputs.height);
      break;
    case "fill":
      this.context.fillRect(inputs.x, inputs.y, inputs.width, inputs.height);
      break;
  }
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
