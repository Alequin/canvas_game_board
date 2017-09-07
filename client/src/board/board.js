
var Square = require("./square");
var BoardEvents = require("./board_events");
var helper = require("./board_helper");

function Board(container){

  container.innerHTML = '<style type="text/css">.game-board-canvas-x010x{position: absolute;}</style>'

  this.innerContainer = helper.createInnerContainer(container);

  this.width = this.innerContainer.offsetWidth;
  this.height = this.innerContainer.offsetHeight;

  var canvases = helper.createCanvases(3, this.width, this.height, "game-board-canvas-x010x");
  this.drawLayer = canvases[0];
  this.imageLayer = canvases[1];
  this.clickLayer = canvases[2];
  helper.appendCanvases(this.innerContainer, canvases);

  this.drawContext = this.drawLayer.getContext("2d");
  this.imageContext = this.imageLayer.getContext("2d");
  this.clickContext = this.clickLayer.getContext("2d");
  this.layersContexts = [this.drawContext, this.imageContext, this.clickContext];

  // this.drawContext.lineWidth = 1;

  this.xSquareCount = 0;
  this.ySquareCount = 0;

  this.squares = [];

  this.savedStates = {};

  this.events = new BoardEvents(this, this.clickLayer);
}

Board.prototype.generateSquares = function(xCount, yCount, border, fill){
  this.xSquareCount = xCount;
  this.ySquareCount = yCount;

  var squareWidth = this.width / xCount;
  var squareHeight = this.height / yCount;

  for(var x=0; x<xCount; x++){
    var row = [];
    this.squares.push(row);
    var xPos = this.squares.length-1;
    for(var y=0; y<yCount; y++){
      var coords = {x: x*squareWidth, y: y*squareHeight};
      var position = {column: xPos, row: row.length};
      var nextSquare = new Square(this, coords, position, squareWidth, squareHeight, border, fill);
      row.push(nextSquare);
    }
  }
}

Board.prototype.draw = function(){
  this.forEachSquare(function(square){
    square.draw();
  }.bind(this));
}

Board.prototype.translate = function(x, y){
  for(var canvas of this.layersContexts){
    canvas.translate(x, y);
  }
}

Board.prototype.copySquares = function(squares){
  var clonedSqaures = [];

  for(var row of squares){
    var clonedRow = [];
    clonedSqaures.push(clonedRow);
    for(var square of row){
      clonedRow.push(square.copy());
    }
  }
  return clonedSqaures;
}

Board.prototype.SavedState = function(board){
  this.squares = board.copySquares(board.squares);
  this.imageData = board.drawContext.getImageData(0,0,board.width,board.height);
}

Board.prototype.addSavedState = function(key){
  this.savedStates[key] = new this.SavedState(this);
}

Board.prototype.loadSavedState = function(key){
  var state = this.savedStates[key]
  this.squares = this.copySquares(state.squares);
  this.drawContext.putImageData(state.imageData, 0, 0);

  this.clearBoard();
  this.forEachSquare(function(square){
    if(square.style.image) square.drawImage();
  });
}

Board.prototype.removeSavedState = function(key){
  delete this.savedStates[key];
}

Board.prototype.clearBoard = function(){
  this.imageContext.clearRect(0, 0, this.width, this.height);
}

Board.prototype.getSquareTop = function(amount, column, row){
  return this.getSquareByPosition(column, row-amount);
};

Board.prototype.getSquareBottom = function(amount, column, row){
  return this.getSquareByPosition(column, row+amount);
};

Board.prototype.getSquareLeft = function(amount, column, row){
  return this.getSquareByPosition(column-amount, row);
};

Board.prototype.getSquareRight = function(amount, column, row){
  return this.getSquareByPosition(column+amount, row);
};

Board.prototype.getSquareTopLeft = function(amount, column, row){
  return this.getSquareByPosition(column-amount, row-amount);
};

Board.prototype.getSquareTopRight = function(amount, column, row){
  return this.getSquareByPosition(column+amount, row-amount);
};

Board.prototype.getSquareBottomLeft = function(amount, column, row){
  return this.getSquareByPosition(column-amount, row+amount);
};

Board.prototype.getSquareBottomRight = function(amount, column, row){
  return this.getSquareByPosition(column+amount, row+amount);
};


Board.prototype.getSquareByPosition = function(column, row){
  if(!this.isPositionValid(row, column)){
    return null;
  }
  return this.squares[column][row];
};

Board.prototype.isPositionValid = function(column, row){

  var isBetween = function(val, min, max){
    return (val >= min && val < max);
  }

  return (
    (isBetween(row, 0, this.xSquareCount)) &&
    (isBetween(column, 0, this.ySquareCount))
  )
}

Board.prototype.getSquareByCoords = function(x, y){

    var findPosition = function(coord, canvasSize, squareSize){
      var position = 0;
      for(var length=squareSize; length<canvasSize; length+=squareSize){
        if(coord > length){
          position++;
        }else{
          break;
        }
      }
      return position;
    }

    var row = findPosition(y, this.height, this.height / this.ySquareCount);
    var column = findPosition(x, this.width, this.width / this.xSquareCount);
    return this.getSquareByPosition(column, row);
}

Board.prototype.forEachSquare = function(callBack){
  for(var row of this.squares){
    for(var square of row){
      if(callBack(square)){
        return square;
      };
    }
  }
}

module.exports = Board;
