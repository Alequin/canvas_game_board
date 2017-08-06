function Square(x, y, width, height){
  this.topLeft = {x: x, y: y};
  this.topRight = {x: x + width, y: y};
  this.bottomLeft = {x: x, y: y + height};
  this.bottomRight = {x: x + width, y: y + height};
}

Square.prototype.prepare = function(context){
  this.context.rect(x, y, squareWidth, squareHeight);
}

Square.prototype.draw = function(context){
  this.prepare(context);
  this.context.stroke();
}
