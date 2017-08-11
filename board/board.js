var freeForm = "freeForm";
var structured = "structured";

function makeFreeFormBoard(container){
  var board =  new Board(container, freeForm);
  return board;
}

function makeStructureBoard(container, xCount, yCount, border, fill){
  var board =  new Board(container, structured);
  board.generateSquares(xCount, yCount, border, fill);
  return board;
}

function Board(container, type){

  this.type = type;

  container.innerHTML = '<style type="text/css">canvas{position: absolute;}</style>'

  this.innerContainer = createInnerContainer(container);

  var min = Math.min(this.innerContainer.offsetWidth, this.innerContainer.offsetHeight);

  this.width = this.innerContainer.offsetWidth;
  this.height = min;

  var canvases = createCanvases(this.innerContainer, this.width, this.height);

  this.drawLayer = canvases.drawLayer;
  this.imageLayer = canvases.imageLayer;
  this.clickLayer = canvases.clickLayer;

  this.drawContext = this.drawLayer.getContext("2d");
  this.imageContext = this.imageLayer.getContext("2d");
  this.clickContext = this.clickLayer.getContext("2d");

  this.drawContext.lineWidth = 1;

  this.xSquareCount = 0;
  this.ySquareCount = 0;

  this.squares = [];

  this.savedStates = {};

  this.clickLayer.addEventListener("click", function(event){
    var square = this.getSquareByCoords(event.offsetX, event.offsetY);
    if(square) square.onClick();
  }.bind(this));

  this.currentSquare = null;

  this.clickLayer.addEventListener("mousemove", function(event){
    var x = event.offsetX;
    var y = event.offsetY;
    var square = this.getSquareByCoords(x, y);
    if(square){
      square.onHover();
      if(square !== this.currentSquare){
        square.onEnter();
      }
    }
    if( this.currentSquare && ((!square && this.currentSquare) || (square !== this.currentSquare)) ){
      this.currentSquare.onLeave();
    }
    this.currentSquare = square;
  }.bind(this));

}

function createInnerContainer(container){
  innerContainer = document.createElement("div");
  container.appendChild(innerContainer);
  innerContainer.style.height = "inherit";
  return innerContainer;
}

function createCanvases(container, width, height){

  result = {}

  result.drawLayer = document.createElement("canvas");
  result.imageLayer = document.createElement("canvas");
  result.clickLayer = document.createElement("canvas");

  var setLayerSize = function(layer){
    layer.width = width;
    layer.height = height;
  }

  setLayerSize(result.drawLayer);
  setLayerSize(result.imageLayer);
  setLayerSize(result.clickLayer);

  container.appendChild(result.drawLayer);
  container.appendChild(result.imageLayer);
  container.appendChild(result.clickLayer);

  return result;
}

Board.prototype.generateSquares = function(xCount, yCount, border, fill){
  this.xSquareCount = xCount;
  this.ySquareCount = yCount;

  var squareWidth = this.width / xCount;
  var squareHeight = this.height / yCount;

  for(var x=0; x<this.width; x+=squareWidth){
    var row = [];
    this.squares.push(row);
    var xPos = this.squares.length-1;
    for(var y=0; y<this.height; y+=squareHeight){
      var coords = {x: x, y: y};
      var position = {x: xPos, y: row.length};
      var nextSquare = new Square(this, coords, position, squareWidth, squareHeight, border, fill);
      row.push(nextSquare);
    }
  }
}

Board.prototype.draw = function(){
  this.forEachSquare(function(square){
    console.log("draw");
    square.draw();
  });
}

Board.prototype.drawBorder = function(){
  this.forEachSquare(function(square){
    square.drawBorder();
  });
}

Board.prototype.setOnSquareClick = function(callBack){
  this.forEachSquare(function(square){
    square.onClick = callBack;
  });
}

Board.prototype.setOnSquareHover = function(callBack){
  this.forEachSquare(function(square){
    square.onHover = callBack;
  });
}

Board.prototype.setOnSquareEnter = function(callBack){
  this.forEachSquare(function(square){
    square.onEnter = callBack;
  });
}

Board.prototype.setOnSquareLeave = function(callBack){
  this.forEachSquare(function(square){
    square.onLeave = callBack;
  });
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
  this.imageData = board.drawContext.getImageData(0,0,board.width,board.height);
}

Board.prototype.addSavedState = function(key){
  this.savedStates[key] = new this.SavedState(this);
}

Board.prototype.loadSavedState = function(key){
  var state = this.savedStates[key]
  this.squares = this.cloneSquares(state.squares);
  this.drawContext.putImageData(state.imageData, 0, 0);

  this.imageContext.clearRect(0, 0, this.width, this.height);
  this.forEachSquare(function(square){
    if(square.data.image) square.drawImage();
  });
}

Board.prototype.removeSavedState = function(key){
  delete this.savedStates[key];
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
    (isBetween(row, 0, this.xSquareCount)) ||
    (isBetween(column, 0, this.ySquareCount))
  )
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

Board.prototype.getSquareByCoords = function(x, y){
  if(this.type === freeForm) return this.identifySquareByCoords(x, y);
  if(this.type === structured) return this.identifySquareByCoordsPosition(x, y);
}

Board.prototype.identifySquareByCoords = function(x, y){
  var foundSquare = this.forEachSquare(function(square){
    if(square.isWithin(x,y)){
      return square;
    }
  });
  return foundSquare;
}

Board.prototype.identifySquareByCoordsPosition = function(x, y){

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
