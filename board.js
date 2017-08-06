function Board(canvas){
  this.canvas = canvas;
  this.context = canvas.getContext("2d");
  this.width = canvas.width;
  this.height = canvas.height;

  this.xSquareCount = 0;
  this.ySquareCount = 0;

  this.squares = [];

  this.onSquareClick = function(square){
    console.log("Clicked", square);
  }

  this.canvas.addEventListener("click", function(event){

  });
}

Board.prototype.draw = function(xCount, yCount){
  this.xSquareCount = xCount;
  this.ySquareCount = yCount;

  var squareWidth = this.width / xCount;
  var squareHeight = this.height / yCount;

  for(var y=0; y<this.height; y+=squareHeight){
    var row = [];
    this.squares.push(row);
    for(var x=0; x<this.width; x+=squareWidth){
      var nextSquare = new Square(this.context, x, y, squareWidth, squareHeight);
      row.push(nextSquare);
      nextSquare.prepareEmpty();
    }
  }
  this.context.stroke();
}

Board.prototype.getSqaure = function(row, column){
  return this.squares[row][column];
};

Board.prototype.getSqaureByCoords = function(x, y){

  var findPosition = function(coord, canvasSize, squareSize){
    var position = 0;
    for(var width=squareSize; width<canvasSize; width+=squareSize){
      if(coord > width){
        position++;
      }else{
        break;
      }
    }
    return position;
  }

  var row = findPosition(x, this.width, this.width / this.xSquareCount);
  var column = findPosition(y, this.height, this.height / this.ySquareCount);;
  return this.getSqaure(row, column);
};

Board.prototype.setOnSquareClick = function(callBack){
  onSquareClick = callBack;
}
