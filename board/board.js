function Board(canvas){
  this.canvas = canvas;
  this.context = canvas.getContext("2d");
  this.width = canvas.width;
  this.height = canvas.height;

  this.xSquareCount = 0;
  this.ySquareCount = 0;

  this.squares = [];

  this.savedStates = {};

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
      square.draw();
    }
  }
}

Board.prototype.getSquare = function(column, row){
  if(!this.isPositionValid(row, column)){
    return null;
  }
  return this.squares[column][row];
};

Board.prototype.isPositionValid = function(column, row){
  return !(
    (row < 0 || row > this.xSquareCount-1) ||
    (column < 0 || column > this.ySquareCount-1)
  );
}

Board.prototype.getSquareTop = function(amount, column, row){
  return this.getSquare(column, row-amount);
};

Board.prototype.getSquareBottom = function(amount, column, row){
  return this.getSquare(column, row+amount);
};

Board.prototype.getSquareLeft = function(amount, column, row){
  return this.getSquare(column-amount, row);
};

Board.prototype.getSquareRight = function(amount, column, row){
  return this.getSquare(column+amount, row);
};

Board.prototype.getSquareTopLeft = function(amount, column, row){
  return this.getSquare(column-amount, row-amount);
};

Board.prototype.getSquareTopRight = function(amount, column, row){
  return this.getSquare(column+amount, row-amount);
};

Board.prototype.getSquareBottomLeft = function(amount, column, row){
  return this.getSquare(column-amount, row+amount);
};

Board.prototype.getSquareBottomRight = function(amount, column, row){
  return this.getSquare(column+amount, row+amount);
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

  var row = findPosition(y, this.height, this.height / this.ySquareCount);
  var column = findPosition(x, this.width, this.width / this.xSquareCount);
  return this.getSquare(column, row);
};

Board.prototype.setOnSquareClick = function(callBack){
  onSquareClick = callBack;
}

Board.prototype.cloneSquares = function(squares){
  var clonedSqaures = [];

  for(var row of squares){
    var clonedRow = [];
    clonedSqaures.push(clonedRow);
    for(var square of row){
      clonedRow.push(square.clone());
    }
  }
  return clonedSqaures;
}

Board.prototype.SavedState = function(board){
  this.squares = board.cloneSquares(board.squares);
  console.log(board.width);
  console.log(board.height);
  this.imageData = board.context.getImageData(0,0,board.width,board.height);
}

Board.prototype.addSavedState = function(key){
  this.savedStates[key] = new this.SavedState(this);
}

Board.prototype.loadSavedState = function(key){
  var state = this.savedStates[key]
  if(state === null || state === undefined) return false;
  this.squares = this.cloneSquares(state.squares);
  this.context.putImageData(state.imageData, 0, 0);
  return true;
}

Board.prototype.removeSavedState = function(key){
  delete this.savedStates[key];
}
