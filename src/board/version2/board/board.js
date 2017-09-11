
const Square = require("./../elements/square");
const BoardEvents = require("./board_events");
const Helper = require("./board_helper");
const SavedState = require("./saved_state");

function Board(container){

  this.container = container;

  this.container.innerHTML = '<style type="text/css">.game-board-canvas-x010x{position: absolute;}</style>'

  this.innerContainer = Helper.createInnerContainer(container);

  this.width = this.innerContainer.offsetWidth;
  this.height = this.innerContainer.offsetHeight;

  var canvases = Helper.createCanvases(3, this.width, this.height, "game-board-canvas-x010x");
  this.drawLayer = canvases[0];
  this.imageLayer = canvases[1];
  this.clickLayer = canvases[2];
  Helper.appendCanvases(this.innerContainer, canvases);

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

  if(xCount % 1 !== 0 && yCount % 1 !== 0){
    throw "Both xCount and yCount must be whole numbers. I recommend using Math.floor."
  }

  this.xSquareCount = xCount;
  this.ySquareCount = yCount;

  var squareWidth = this.width / this.xSquareCount;
  var squareHeight = this.height / this.ySquareCount;

  for(var x=0; x<this.xSquareCount; x++){
    var row = [];
    this.squares.push(row);
    var xPos = this.squares.length-1;
    for(var y=0; y<this.ySquareCount; y++){
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

Board.prototype.remove = function(){
  this.container.removeChild(this.innerContainer);
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

Board.prototype.saveState = function(key){
  this.savedStates[key] = new SavedState(this);
}

/*
* Save state works with images but due to the requirement of images to load
* there will be issues with timing. If the time between
* the call to square.drawImage() and board.loadSavedState() is not great enough
* the images will not be removed. There are no time issues with
* drawn elements as far as I am aware.

* It is not recommended to use images and savedStates when the time between draw
* and load is short. 
*/
Board.prototype.loadSavedState = function(key){
  const state = this.savedStates[key]
  this.squares = this.copySquares(state.squares);

  this.clearBoard();
  this.forEachSquare(function(square){
    square.draw();
  });
}

Board.prototype.removeSavedState = function(key){
  delete this.savedStates[key];
}

Board.prototype.clearBoard = function(){
  this.drawContext.clearRect(0, 0, this.width, this.height);
  this.imageContext.clearRect(0, 0, this.width, this.height);
}

Board.prototype.getSquareTop = function(position, amount){
  amount = this.manageOffset(amount);
  return this.getSquareByPosition(position.column, position.row-amount);
};

Board.prototype.getSquareBottom = function(position, amount){
  amount = this.manageOffset(amount);
  return this.getSquareByPosition(position.column, position.row+amount);
};

Board.prototype.getSquareLeft = function(position, amount){
  amount = this.manageOffset(amount);
  return this.getSquareByPosition(position.column-amount, position.row);
};

Board.prototype.getSquareRight = function(position, amount){
  amount = this.manageOffset(amount);
  return this.getSquareByPosition(position.column+amount, position.row);
};

Board.prototype.getSquareTopLeft = function(position, amount){
  amount = this.manageOffset(amount);
  return this.getSquareByPosition(position.column-amount, position.row-amount);
};

Board.prototype.getSquareTopRight = function(position, amount){
  amount = this.manageOffset(amount);
  return this.getSquareByPosition(position.column+amount, position.row-amount);
};

Board.prototype.getSquareBottomLeft = function(position, amount){
  amount = this.manageOffset(amount);
  return this.getSquareByPosition(position.column-amount, position.row+amount);
};

Board.prototype.getSquareBottomRight = function(position, amount){
  amount = this.manageOffset(amount);
  return this.getSquareByPosition(position.column+amount, position.row+amount);
};

Board.prototype.manageOffset = function(amount){
  if(amount || amount === 0) return amount;
  return 1;
}

Board.prototype.switchSquares = function(square1, square2){

  this.squares[square1.position.column][square1.position.row] = square2;
  this.squares[square2.position.column][square2.position.row] = square1;

  const square1Position = square1.position;
  const square1Coordinates = square1.coordinates;
  const square2Position = square2.position;
  const square2Coordinates = square2.coordinates;

  square1.setPosition(square2Position);
  square1.setCoordinates(square2Coordinates);

  square2.setPosition(square1Position);
  square2.setCoordinates(square1Coordinates);
}

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
