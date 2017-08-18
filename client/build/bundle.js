/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Board = __webpack_require__(1);

window.addEventListener("load", function(){

  var boardContainer = document.getElementById("game-board");
  var board = new Board(boardContainer);
  board.generateSquares(10, 10, "black", "white");
  board.draw();

  board.setOnSquareClick(onSquareClick);
});

function logSquare(board, square){
  console.log(square.center);
}

function onSquareClick(board, square){

  if(square.position.x === 8  && square.position.y === 9){
    board.addSavedState("save");
    return;
  }
  if(square.position.x === 9  && square.position.y === 9){
    board.loadSavedState("save");
    return;
  }

  square.style.borderColour = "orange";
  square.addImage("cat.png", 1);
  square.draw();
}

function onSquareClick1(square){
  square.remove();
}

function testReloadView(board){
  var ctx = board.context;

  var imageData = ctx.getImageData(0, 0, board.width, board.height);
  ctx.clearRect(0, 0, board.width, board.height);
  ctx.putImageData(imageData, 0, 0);
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {


var Square = __webpack_require__(2);

function Board(container){

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
  this.layersContexts = [this.drawContext, this.imageContext, this.clickContext];

  this.drawContext.lineWidth = 1;

  this.xSquareCount = 0;
  this.ySquareCount = 0;

  this.squares = [];

  this.savedStates = {};

  this.clickLayer.addEventListener("click", function(event){
    var square = this.getSquareByCoords(event.offsetX, event.offsetY);
    if(square) square.onClick(this, square);
  }.bind(this));

  this.currentSquare = null;

  this.clickLayer.addEventListener("mousemove", function(event){
    var x = event.offsetX;
    var y = event.offsetY;
    var square = this.getSquareByCoords(x, y);
    if(square){
      square.onHover(this, square);
      if(square !== this.currentSquare){
        square.onEnter(this, square);
      }
    }

    if( this.currentSquare && ( (!square && this.currentSquare) || (square !== this.currentSquare) ) ){
      this.currentSquare.onLeave(this, this.currentSquare);
    }

    this.currentSquare = square;
  }.bind(this));

  this.clickLayer.addEventListener("mouseout", function(event){
    if(this.currentSquare){
      this.currentSquare.onLeave(this, this.currentSquare);
      this.currentSquare = null;
    }
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
    square.draw();
  });
}

Board.prototype.drawBorder = function(){
  this.forEachSquare(function(square){
    square.drawBorder();
  });
}

Board.prototype.translate = function(x, y){
  for(var canvas of this.layersContexts){
    canvas.translate(x, y);
  }
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
    if(square.style.image) square.drawImage();
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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

function makeSqaureFromCorner(board, coords, position, width, height, borderColour, fillColour){
  return new Square(board, coords, position, width, height, borderColour, fillColour);
}

function makeSqaureFromCenter(board, center, position, width, height, borderColour, fillColour){
  var coords = {x: center.x-width/2, y: center.y-height/2};
  return new Square(board, coords, position, width, height, borderColour, fillColour);
}

function Square(board, coords, position, width, height, borderColour, fillColour){

  this.drawContext = board.drawContext;
  this.imageContext = board.imageContext;

  coords.x = Math.floor(coords.x);
  coords.y = Math.floor(coords.y);

  this.coordinates = coords;
  this.position = position;
  this.width = width;
  this.height = height;

  this.topLeft = {x: coords.x, y: coords.y};
  this.topRight = {x: coords.x + width, y: coords.y};
  this.bottomLeft = {x: coords.x, y: coords.y + height};
  this.bottomRight = {x: coords.x + width, y: coords.y + height};

  this.center = {x: coords.x + width/2, y: coords.y + height/2}

  this.onClick = this.initialEvent;
  this.onHover = this.initialEvent;
  this.onEnter = this.initialEvent;
  this.onLeave = this.initialEvent;

  this.style = {
    image: null,
    imageSize: 1,
    borderColour: borderColour,
    fillColour: fillColour,
  }

  this.data = {};

  this.squareSpace = 1.25;
}

Square.prototype.initialEvent = function(board, square){}

Square.prototype.draw = function(){
  this.drawFill();
  if(this.style.image) this.drawImage();
}

Square.prototype.drawBorder = function(){
  var holdStrokeStyle = this.drawContext.strokeStyle;
  this.drawContext.strokeStyle = this.style.borderColour;
  this.drawContext.strokeRect(
    this.coordinates.x+this.squareSpace, this.coordinates.y+this.squareSpace,
    this.width-this.squareSpace*2, this.height-this.squareSpace*2
  );
  this.drawContext.strokeStyle = holdStrokeStyle;
}

Square.prototype.drawFill = function(){
  var holdFillStyle = this.drawContext.fillStyle;
  this.drawContext.fillStyle = this.style.fillColour;
  this.drawContext.fillRect(
    this.coordinates.x+this.squareSpace, this.coordinates.y+this.squareSpace,
    this.width-this.squareSpace*2, this.height-this.squareSpace*2
  );
  this.drawContext.fillStyle = holdFillStyle;

  if(this.style.borderColour !== this.style.fillColour) this.drawBorder();
}

Square.prototype.drawImage = function(){

  this.imageTag = document.createElement("img");

  var calcPosition = function(coord, length, percentageSize){
    var diff = (coord + length/2) - coord;
    return coord + (diff * (1-percentageSize));
  }

  var x = calcPosition(this.coordinates.x, this.width, this.style.imageSize);
  var y = calcPosition(this.coordinates.y, this.height, this.style.imageSize);

  var width = this.width * this.style.imageSize;
  var height = this.height * this.style.imageSize;

  var onLoadImage = function(){
    this.imageContext.drawImage(this.imageTag, x, y, width, height);
    this.imageTag = undefined;
  }.bind(this);
  this.imageTag.src = this.style.image;

  this.imageTag.addEventListener("load", onLoadImage);
}

Square.prototype.addImage = function(imageLink, percentageSize){
  this.style.image = imageLink;
  this.style.imageSize = percentageSize;
}

Square.prototype.remove = function(){
  this.removeDrawn();
  this.removeImage();
}

Square.prototype.removeDrawn = function(){
  this.drawContext.clearRect(
    this.coordinates.x+squareSpace, this.coordinates.y+squareSpace,
    this.width-squareSpace*2, this.height+squareSpace*2
  );
}

Square.prototype.removeImage = function(){
  this.imageContext.clearRect(
    this.coordinates.x+squareSpace, this.coordinates.y+squareSpace,
    this.width-squareSpace*2, this.height+squareSpace*2
  );
}

Square.prototype.isWithin = function(x, y){
  return !(x < this.topLeft.x || x >= this.topRight.x) &&
        !(y < this.topLeft.y || y >= this.bottomLeft.y);
}

Square.prototype.copy = function(){

  var emptyBoard = {
    drawContext: null,
    imageContext: null
  }

  var newSquare = new Square(
    emptyBoard,
    this.coordinates,
    this.position,
    this.width,
    this.height,
    null,
    null
  );

  newSquare.onClick = this.onClick;
  newSquare.onHover = this.onHover;
  newSquare.onEnter = this.onEnter;
  newSquare.onLeave = this.onLeave;

  newSquare.drawContext = this.drawContext;
  newSquare.imageContext = this.imageContext;

  newSquare.style = this.copyObject(this.style);
  newSquare.data = this.copyObject(this.data);

  return newSquare;
}

Square.prototype.copyObject = function(object){
  var newObject = {};
  for(var key of Object.keys(object)){
    newObject[key] = object[key];
  }
  return newObject;
}

module.exports = Square;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map