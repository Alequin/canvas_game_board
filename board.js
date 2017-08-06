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
  console.log(row);
  console.log(column);
  return this.squares[row][column];
};

Board.prototype.getSqaureByCoords = function(x, y){
  var row = 0;
  var squareWidth = this.width / this.xSquareCount;
  for(var width=squareWidth; width<this.width; width+=squareWidth){
    if(x > width){
      row++;
    }else{
      break;
    }
  }
  var column = 0;
  var squareHeight = this.height/ this.ySquareCount;
  for(var height=squareHeight; width<this.height; height+=squareHeight){
    if(y > height){
      column++;
    }else{
      break;
    }
  }

  return this.getSqaure(row, column);
};

Board.prototype.setOnSquareClick = function(callBack){
  onSquareClick = callBack;
}
