function Square(context, x, y, width, height){
  this.context = context;
  this.topLeft = {x: x, y: y};
  this.topRight = {x: x + width, y: y};
  this.bottomLeft = {x: x, y: y + height};
  this.bottomRight = {x: x + width, y: y + height};
}

Square.prototype.prepare = function(){
  this.context.rect(x, y, squareWidth, squareHeight);
}

Square.prototype.draw = function(){
  this.prepare(context);
  this.context.stroke();
}
