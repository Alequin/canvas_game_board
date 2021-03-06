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
var Block = __webpack_require__(7);

window.addEventListener("load", function(){
  var boardContainer = document.getElementById("game-board");
  var board = new Board(boardContainer);
  board.generateSquares(5, 5, "black", "white");
  board.draw();

  canSetOnHover(board);
});

function canSetOnHover(board){

  board.events.activateOnHover();

  const squares = [
    board.getSquareByPosition(1,1),
    board.getSquareByPosition(1,2),
    board.getSquareByPosition(2,2)
  ]

  const block = new Block(board, squares);
  block.setFill("blue");
  block.draw();

  block.setOnHover((board, square) => {
    console.log("hover");
    block.setFill("yellow");
    block.remove();
    block.draw();
  })
}

function canSetOnClick(board){

  board.events.activateOnClick();

  const squares = [
    board.getSquareByPosition(1,1),
    board.getSquareByPosition(1,2),
    board.getSquareByPosition(2,2)
  ]

  const block = new Block(board, squares);
  block.setFill("blue");
  block.draw();

  block.setOnClick((board, square) => {
    block.setFill("yellow");
    block.remove();
    block.draw();
  })
}

function canMoveBlock(board){

  const squares = [
    board.getSquareByPosition(1,1),
    board.getSquareByPosition(1,2),
    board.getSquareByPosition(2,2)
  ]

  const block = new Block(board, squares);
  block.setFill("blue");
  block.draw();

  setTimeout(() => {
    const newBlock = block.getBlockTopRight();

    block.setFill("white");
    block.remove();
    block.draw();

    newBlock.setFill("blue");
    newBlock.remove();
    newBlock.draw();
  }, 1000);

}

function canRemoveBlock(board){

  const squares = [
    board.getSquareByPosition(1,1),
    board.getSquareByPosition(1,2),
    board.getSquareByPosition(2,2)
  ]

  const block = new Block(board, squares);
  block.remove();

}

function canDrawBlock(board){

  const squares = [
    board.getSquareByPosition(1,1),
    board.getSquareByPosition(1,2),
    board.getSquareByPosition(2,2)
  ]

  const block = new Block(board, squares);
  block.setFill("blue");
  block.setBorder("yellow");
  block.draw();

}

function canUseSavedStates(board){

  board.saveState("blank");

  const firstColumn = board.squares[0];

  for(let square of firstColumn){
    square.style.fillColour = "blue";
    square.addImage("./../images/cat.png", 1);
  }

  setTimeout(() => {
    for(let square of firstColumn){
      square.remove();
      square.draw();
    }

    board.loadSavedState("blank");
  }, 40);
}

function canSwitchSquaresUsingSquare(board){
  const square = board.getSquareByPosition(0,2);
  square.style.fillColour = "blue";
  const square2 = board.getSquareByPosition(2,2);
  square2.style.fillColour = "yellow";
  square.switchWith(square2);
  square.draw();
  square2.draw();
}

function canSwitchSquaresUsingBoard(board){
  const square = board.getSquareByPosition(0,2);
  square.style.fillColour = "blue";
  const square2 = board.getSquareByPosition(2,2);
  square2.style.fillColour = "yellow";
  board.switchSquares(square2, square);
  square.draw();
  square2.draw();
}

function canGetSquareAbove(board){
  const square = board.getSquareByPosition(0,2);
  const square2 = square.getTop();
  square2.style.fillColour = "blue";
  square2.draw();
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {


const Square = __webpack_require__(2);
const BoardEvents = __webpack_require__(4);
const Helper = __webpack_require__(5);
const SavedState = __webpack_require__(6);

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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const copyObject = __webpack_require__(3);

function makeSquareFromCorner(board, coords, position, width, height, borderColour, fillColour){
  return new Square(board, coords, position, width, height, borderColour, fillColour);
}

function makeSquareFromCenter(board, center, position, width, height, borderColour, fillColour){
  var coords = {x: center.x-width/2, y: center.y-height/2};
  return new Square(board, coords, position, width, height, borderColour, fillColour);
}

function Square(board, coords, position, width, height, borderColour, fillColour){

  this.board = board;

  this.drawContext = this.board.drawContext;
  this.imageContext = this.board.imageContext;

  this.coordinates;
  this.setCoordinates(coords);
  this.position;
  this.setPosition(position);
  this.width = width;
  this.height = height;

  this.topLeft = {x: this.coordinates.x, y: this.coordinates.y};
  this.topRight = {x: this.coordinates.x + this.width, y: this.coordinates.y};
  this.bottomLeft = {x: this.coordinates.x, y: this.coordinates.y + this.height};
  this.bottomRight = {x: this.coordinates.x + this.width, y: this.coordinates.y + this.height};

  this.center = {x: this.coordinates.x + this.width/2, y: this.coordinates.y + this.height/2}

  this.handleClick = null;
  this.handleHover = null;
  this.handleEnter = null;
  this.handleLeave = null;

  this.style = {
    image: null,
    imageSize: 1,
    borderColour: borderColour,
    fillColour: fillColour,
  }

  this.data = {};

  this.squareSpace = 1;
}

Square.prototype.draw = function(){
  this.drawFill();
  if(this.style.borderColour !== this.style.fillColour) this.drawBorder();
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
}

Square.prototype.drawImage = function(){

  var calcPosition = function(coord, length, percentageSize){
    var diff = (coord + length/2) - coord;
    return coord + (diff * (1-percentageSize));
  }

  var x = calcPosition(this.coordinates.x, this.width, this.style.imageSize);
  var y = calcPosition(this.coordinates.y, this.height, this.style.imageSize);

  var width = this.width * this.style.imageSize;
  var height = this.height * this.style.imageSize;

  var onLoadImage = function(){
    this.imageContext.drawImage(this.style.image, x, y, width, height);
  }.bind(this);

  this.style.image.addEventListener("load", onLoadImage);
}

Square.prototype.addImage = function(imageLink, percentageSize){
  this.style.image = document.createElement("img");
  this.style.image.src = imageLink;
  this.style.imageSize = percentageSize;
}

Square.prototype.remove = function(){
  this.removeDrawn();
  this.removeImage();
}

Square.prototype.removeDrawn = function(){
  var space = this.squareSpace/2;
  this.drawContext.clearRect(
    this.coordinates.x, this.coordinates.y,
    this.width, this.height
  );
}

Square.prototype.removeImage = function(){
  this.imageContext.clearRect(
    this.coordinates.x+this.squareSpace, this.coordinates.y+this.squareSpace,
    this.width-this.squareSpace*2, this.height+this.squareSpace*2
  );
}

Square.prototype.setPosition = function(position){
  const keys = Object.keys(position);
  if(keys[0] !== "column" && keys[1] !== "row"){
    throw "Incorrect keys on given object. Key 1 must be column. Key 2 must be row."
  }
  this.position = copyObject(position);
}

Square.prototype.setCoordinates = function(coordinates){
  const keys = Object.keys(coordinates);
  if(keys[0] !== "x" && keys[1] !== "y"){
    throw "Incorrect keys on given object. Key 1 must be . Key 2 must be y."
  }
  this.coordinates = copyObject(coordinates);

  this.topLeft = {x: this.coordinates.x, y: this.coordinates.y};
  this.topRight = {x: this.coordinates.x + this.width, y: this.coordinates.y};
  this.bottomLeft = {x: this.coordinates.x, y: this.coordinates.y + this.height};
  this.bottomRight = {x: this.coordinates.x + this.width, y: this.coordinates.y + this.height};

  this.center = {x: this.coordinates.x + this.width/2, y: this.coordinates.y + this.height/2}
}

Square.prototype.isWithin = function(x, y){
  return !(x < this.topLeft.x || x >= this.topRight.x) &&
        !(y < this.topLeft.y || y >= this.bottomLeft.y);
}

Square.prototype.getTop = function(amount){
  amount = this.manageOffset(amount);
  return this.board.getSquareByPosition(this.position.column, this.position.row-amount);
};

Square.prototype.getBottom = function(amount){
  amount = this.manageOffset(amount);
  return this.board.getSquareByPosition(this.position.column, this.position.row+amount);
};

Square.prototype.getLeft = function(amount){
  amount = this.manageOffset(amount);
  return this.board.getSquareByPosition(this.position.column-amount, this.position.row);
};

Square.prototype.getRight = function(amount){
  amount = this.manageOffset(amount);
  return this.board.getSquareByPosition(this.position.column+amount, this.position.row);
};

Square.prototype.getTopLeft = function(amount){
  amount = this.manageOffset(amount);
  return this.board.getSquareByPosition(this.position.column-amount, this.position.row-amount);
};

Square.prototype.getTopRight = function(amount){
  amount = this.manageOffset(amount);
  return this.board.getSquareByPosition(this.position.column+amount, this.position.row-amount);
};

Square.prototype.getBottomLeft = function(amount){
  amount = this.manageOffset(amount);
  return this.board.getSquareByPosition(this.position.column-amount, this.position.row+amount);
};

Square.prototype.getBottomRight = function(amount){
  amount = this.manageOffset(amount);
  return this.board.getSquareByPosition(this.position.column+amount, this.position.row+amount);
};

Square.prototype.manageOffset = function(amount){
  if(amount || amount === 0) return amount;
  return 1;
}

Square.prototype.switchWith = function(squareToSwitch){
  this.board.switchSquares(this, squareToSwitch);
}

Square.prototype.copy = function(){

  var newSquare = new Square(
    this.board,
    this.coordinates,
    this.position,
    this.width,
    this.height,
    null,
    null
  );

  newSquare.onClick = this.handleClick;
  newSquare.onHover = this.onHover;
  newSquare.onEnter = this.onEnter;
  newSquare.onLeave = this.handleLeave;

  newSquare.style.image = this.style.image;
  newSquare.style.imageSize = this.style.imageSize;
  newSquare.style.fillColour = this.style.fillColour;
  newSquare.style.borderColour = this.style.borderColour;

  newSquare.data = copyObject(this.data);

  return newSquare;
}

module.exports = Square;


/***/ }),
/* 3 */
/***/ (function(module, exports) {


module.exports = function(object){
  const newObject = {};
  for(let key of Object.keys(object)){
    newObject[key] = object[key];
  }
  return newObject;
}


/***/ }),
/* 4 */
/***/ (function(module, exports) {


function BoardEvents(board, canvas){
  this.board = board;
  this.canvas = canvas
  this.context = canvas.context;

  this.isHoverActive = false;
  this.isEnterActive = false;
  this.isLeaveActive = false;

  this.currentSquare = null;
}

BoardEvents.prototype.activateOnClick = function(){
  if(!this.canvas.onclick){
    this.canvas.onclick = function(event){
      var square = this.board.getSquareByCoords(event.offsetX, event.offsetY);
      if(square && square.handleClick) square.handleClick(this.board, square);
    }.bind(this);
  }
};

BoardEvents.prototype.disableOnClick = function(){
  this.canvas.onclick = null;
};

BoardEvents.prototype.activateOnHover = function(){
  if(!this.canvas.onmousemove) this.setOnMouseMove();
  this.isHoverActive = true;
}

BoardEvents.prototype.disableOnHover = function(){
  this.isHoverActive = false;
  if(this.areAnyMoveEventsActive()){
    this.canvas.onmousemove = null;
  }
}

BoardEvents.prototype.activateOnEnter = function(){
  if(!this.canvas.onmousemove) this.setOnMouseMove();
  this.isEnterActive = true;
}

BoardEvents.prototype.disableOnEnter = function(){
  this.isEnterActive = false;
  if(this.areAnyMoveEventsActive()){
    this.canvas.onmousemove = null;
  }
}

BoardEvents.prototype.activateOnLeave = function(){
  if(!this.canvas.onmousemove) this.setOnMouseMove();
  this.isLeaveActive = true;

  if(!this.canvas.onmouseout){
    this.canvas.onmouseout = function(event){
      if(this.currentSquare && this.currentSquare.handleLeave){
        this.currentSquare.handleLeave(this, this.currentSquare);
        this.currentSquare = null;
      }
    }.bind(this);
  }
}

BoardEvents.prototype.disableOnLeave = function(){
  this.isLeaveActive = false;
  if(this.areAnyMoveEventsActive()){
    this.canvas.onmousemove = null;
  }
  this.canvas.mouseout = null;
}

BoardEvents.prototype.disableMouseEvents = function(){
  this.disableOnClick();
  this.disableOnHover();
  this.disableOnEnter();
  this.disableOnLeave();
}

BoardEvents.prototype.setOnMouseMove = function(){
  this.canvas.onmousemove = function(event){
    var square = this.board.getSquareByCoords(event.offsetX, event.offsetY);
    if(square){

      if(this.isHoverActive){
        if(square.handleHover) square.handleHover(this.board, square);
      }

      if(this.isEnterActive && square !== this.currentSquare){

        if(square.handleEnter) square.handleEnter(this.board, square);
      }

    }

    if(this.isLeaveActive && this.currentSquare && ( (!square && this.currentSquare) || (square !== this.currentSquare) ) ){
      if(this.currentSquare.handleLeave){
        this.currentSquare.handleLeave(this.board, this.currentSquare);
      }
    }

    this.currentSquare = square;
  }.bind(this);
}

BoardEvents.prototype.areAnyMoveEventsActive = function(){
  return this.isHoverActive || this.isEnterActive || this.isLeaveActive;
}

module.exports = BoardEvents;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

function Helper(){}

Helper.createInnerContainer = function(container){
  innerContainer = document.createElement("div");
  container.appendChild(innerContainer);
  innerContainer.style.height = "100%";
  return innerContainer;
}

Helper.createCanvases = function(count, width, height, className){

  result = []

  for(var j=0; j<count; j++){
    var canvas = document.createElement("canvas");

    canvas.classList.add(className);

    canvas.width = width;
    canvas.height = height;

    result.push(canvas);
  }

  return result;
}

Helper.appendCanvases = function(container, canvases){
  for(var canvas of canvases){
    container.appendChild(canvas);
  }
}

module.exports = Helper;


/***/ }),
/* 6 */
/***/ (function(module, exports) {


function SavedState(board){
  this.squares = board.copySquares(board.squares);
}

module.exports = SavedState;


/***/ }),
/* 7 */
/***/ (function(module, exports) {


function Block(board, squares){
  for(let square of squares){
    if(!square) throw "All squares must be valid"
  }
  this.board = board;
  this.squares = squares
}

Block.prototype.draw = function(){
  this.forEachSquare((square) => {square.draw()});
}

Block.prototype.remove = function(){
  this.forEachSquare((square) => {square.remove()});
}

Block.prototype.setBorder = function(colour){
  this.forEachSquare((square) => {square.style.borderColour = colour});
}

Block.prototype.setFill = function(colour){
  this.forEachSquare((square) => {square.style.fillColour = colour});
}

Block.prototype.forEachSquare = function(callBack){
  for(let square of this.squares){
    if(callBack(square)){
      return square;
    }
  }
}

Block.prototype.setOnClick = function(callBack){
  this.forEachSquare((square) => {
    square.handleClick = callBack;
  });
}

Block.prototype.setOnHover = function(callBack){
  this.forEachSquare((square) => {
    square.handleHover = callBack;
  });
}

Block.prototype.getBlockTop = function(amount){

  const blockSquares = []
  this.forEachSquare((square) => {
    blockSquares.push(square.getTop(amount));
  });

  return new Block(this.board, blockSquares);
}

Block.prototype.getBlockBottom = function(amount){

  const blockSquares = []
  this.forEachSquare((square) => {
    blockSquares.push(square.getBottom(amount));
  });

  return new Block(this.board, blockSquares);
}

Block.prototype.getBlockLeft = function(amount){

  const blockSquares = []
  this.forEachSquare((square) => {
    blockSquares.push(square.getLeft(amount));
  });

  return new Block(this.board, blockSquares);
}

Block.prototype.getBlockRight = function(amount){

  const blockSquares = []
  this.forEachSquare((square) => {
    blockSquares.push(square.getRight(amount));
  });

  return new Block(this.board, blockSquares);
}

Block.prototype.getBlockTopLeft = function(amount){

  const blockSquares = []
  this.forEachSquare((square) => {
    blockSquares.push(square.getTopLeft(amount));
  });

  return new Block(this.board, blockSquares);
}

Block.prototype.getBlockTopRight = function(amount){

  const blockSquares = []
  this.forEachSquare((square) => {
    blockSquares.push(square.getTopRight(amount));
  });

  return new Block(this.board, blockSquares);
}

Block.prototype.getBlockBottomLeft = function(amount){

  const blockSquares = []
  this.forEachSquare((square) => {
    blockSquares.push(square.getBottomLeft(amount));
  });

  return new Block(this.board, blockSquares);
}

Block.prototype.getBlockBottomRight = function(amount){

  const blockSquares = []
  this.forEachSquare((square) => {
    blockSquares.push(square.getBottomRight(amount));
  });

  return new Block(this.board, blockSquares);
}

module.exports = Block;


/***/ })
/******/ ]);
//# sourceMappingURL=test_board_v2_bundle.js.map