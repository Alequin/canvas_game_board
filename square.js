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

Square.prototype.prepareEmpty = function(){
  this.context.rect(this.position.x, this.position.y, this.width, this.height);
}

Square.prototype.drawEmpty = function(){
  this.prepare(context);
  this.context.stroke();
}

Square.prototype.prepareFill = function(){
  this.context.fillRect(this.position.x, this.position.y, this.width, this.height);
}

Square.prototype.drawFill = function(){
  this.prepare(context);
  this.context.stroke();
}

Square.prototype.remove = function(){
  this.context.clearRect(this.position.x, this.position.y, this.width, this.height);
}

Square.prototype.isWithin = function(x, y){
  return !(x < this.topLeft.x || x >= this.topRight.x) &&
        !(y < this.topLeft.y || y >= this.bottomLeft.y);
}
