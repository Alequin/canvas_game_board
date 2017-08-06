function Board(canvas){
  this.canvas = canvas;
  this.context = canvas.getContext("2d");
  this.width = canvas.width;
  this.height = canvas.height;

  this.xSquareCount = 0;
  this.ySquareCount = 0;

  this.squares = [];

  this.onSquareClick = function(square){
    console.log("Clicked: " + square.position.x + "/" + square.position.y);
    console.log("Clicked: " + square.coordinates.x + "/" + square.coordinates.y);
  }

  this.canvas.addEventListener("click", function(event){
    var square = this.getSquareByCoords(event.offsetX, event.offsetY);
    this.onSquareClick(square);
  }.bind(this));
}

Board.prototype.generateSquares = function(xCount, yCount, border, fill){
  this.xSquareCount = xCount;
  this.ySquareCount = yCount;

  var squareWidth = this.width / xCount;
  var squareHeight = this.height / yCount;

  for(var x=0; x<this.height; x+=squareHeight){
    var row = [];
    this.squares.push(row);
    for(var y=0; y<this.width; y+=squareWidth){
      var coords = {x: x, y: y};
      var position = {x: this.squares.length-1, y: row.length};
      var nextSquare = new Square(this.context, coords, position, squareWidth, squareHeight, border, fill);
      row.push(nextSquare);
    }
  }
}

Board.prototype.draw = function(){
  for(var row of this.squares){
    for(var square of row){
      square.drawEmpty();
    }
  }
}

Board.prototype.getSquare = function(row, column){
  return this.squares[row][column];
};

Board.prototype.getSquareByCoords = function(x, y){

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
  return this.getSquare(row, column);
};

Board.prototype.setOnSquareClick = function(callBack){
  onSquareClick = callBack;
}

Board.prototype.setBorderColour = function(colour){
  this.context.strokeStyle = colour
}

Board.prototype.setFillColour = function(colour){
  this.context.fillStyle = colour
}

Board.prototype.setColour = function(colour){
  this.setBorderColour(colour);
  this.setFillColour(colour);
}
