function Square(context, x, y, width, height){

  this.context = context;
  this.position = {x: x, y: y};
  this.width = width;
  this.height = height;

  this.topLeft = {x: x, y: y};
  this.topRight = {x: x + width, y: y};
  this.bottomLeft = {x: x, y: y + height};
  this.bottomRight = {x: x + width, y: y + height};

}

Square.prototype.prepare = function(){
  this.context.rect(this.position.x, this.position.y, this.width, this.height);
}

Square.prototype.draw = function(){
  this.prepare(context);
  this.context.stroke();
}

Square.prototype.remove = function(){
  this.context.clearRect(this.position.x, this.position.y, this.width, this.height);
}
