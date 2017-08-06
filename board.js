function Board(canvas){
  this.canvas = canvas;
  this.context = canvas.getContext("2d");
  this.width = canvas.width;
  this.height = canvas.height;

  this.squares = [];
}

Board.prototype.draw = function(xCount, yCount){
  var squareWidth = this.width / xCount;
  var squareHeight = this.height / yCount;

  for(var y=0; y<this.height; y+=squareHeight){
    for(var x=0; x<this.width; x+=squareWidth){
      var nextSquare = new Square(this.context, x, y, squareWidth, squareHeight);
      this.squares.push(nextSquare);
      nextSquare.prepare();
    }
  }
  this.context.stroke();
}
