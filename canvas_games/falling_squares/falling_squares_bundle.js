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

var FallingSquares = __webpack_require__(1);

window.addEventListener("load", function(){
  var boardContainer = document.getElementById("game-board");

  var colour = {
    borderColour: "black",
    fillColour: "white",
    fallingSquareColour: "yellow"
  }

  var fallingSquares = new FallingSquares(boardContainer, 10, 10, 10, 2, colour);
  fallingSquares.run();
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Board = __webpack_require__(2);
var Animation = __webpack_require__(6);
var randomInt = __webpack_require__(7);

function FallingSquares(container, width, height, maxFalling, fps, colour){
  this.board = new Board(container);

  this.width = Math.floor(width);
  this.height = Math.floor(height);
  this.board.generateSquares(this.width, this.height, colour.borderColour, colour.fillColour);
  this.board.draw();

  this.fps = fps;

  this.borderColour = colour.borderColour;
  this.fillColour = colour.fillColour;
  this.fallingSquareColour = colour.fallingSquareColour;
  this.maxFalling = maxFalling;
  this.currentFalling = 0;
  this.fallingSquares = [];
}

FallingSquares.prototype.run = function(){
  this.startAnimation();
}

FallingSquares.prototype.startAnimation = function(){
  this.startTime = Date.now();
  var animation = new Animation(this.fps, this.prepareFrame.bind(this));
  animation.start();
}

FallingSquares.prototype.prepareFrame = function(){
  for(var index in this.fallingSquares){
    if(this.fallingSquares[index]) this.moveSquareDown(index);
  }

  if(this.currentFalling < this.maxFalling){
    var newSquare = this.getNewSquare();
    this.fallingSquares.push(newSquare);
    this.currentFalling++;
    newSquare.style.fillColour = this.fallingSquareColour;
    newSquare.draw();
  }
}

FallingSquares.prototype.getNewSquare = function(){
  var columnIndex = randomInt(0, this.width-1);
  var newSquare = this.board.getSquareByPosition(columnIndex, 0);
  return newSquare;
}

FallingSquares.prototype.moveSquareDown = function(index){
  var square = this.fallingSquares[index];
  var nextSquare = this.board.getSquareBottom(square.position.column, square.position.row);

  if(!nextSquare){
    nextSquare = this.getNewSquare();
  }

  square.remove();
  nextSquare.remove();

  square.style.fillColour = this.fillColour;
  nextSquare.style.fillColour = this.fallingSquareColour;

  square.draw();
  nextSquare.draw();

  this.fallingSquares[index] = nextSquare;
}

module.exports = FallingSquares;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {


var Square = __webpack_require__(3);
var BoardEvents = __webpack_require__(4);
var helper = __webpack_require__(5);

function Board(container){

  this.container = container;

  this.container.innerHTML = '<style type="text/css">.game-board-canvas-x010x{position: absolute;}</style>'

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

Board.prototype.getSquareTop = function(column, row, amount){
  amount = this.manageOffset(amount);
  return this.getSquareByPosition(column, row-amount);
};

Board.prototype.getSquareBottom = function(column, row, amount){
  amount = this.manageOffset(amount);
  return this.getSquareByPosition(column, row+amount);
};

Board.prototype.getSquareLeft = function(column, row, amount){
  amount = this.manageOffset(amount);
  return this.getSquareByPosition(column-amount, row);
};

Board.prototype.getSquareRight = function(column, row, amount){
  amount = this.manageOffset(amount);
  return this.getSquareByPosition(column+amount, row);
};

Board.prototype.getSquareTopLeft = function(column, row, amount){
  amount = this.manageOffset(amount);
  return this.getSquareByPosition(column-amount, row-amount);
};

Board.prototype.getSquareTopRight = function(column, row, amount){
  amount = this.manageOffset(amount);
  return this.getSquareByPosition(column+amount, row-amount);
};

Board.prototype.getSquareBottomLeft = function(column, row, amount){
  amount = this.manageOffset(amount);
  return this.getSquareByPosition(column-amount, row+amount);
};

Board.prototype.getSquareBottomRight = function(column, row, amount){
  amount = this.manageOffset(amount);
  return this.getSquareByPosition(column+amount, row+amount);
};

Board.prototype.manageOffset = function(amount){
  if(amount || amount === 0) return amount;
  return 1;
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
/* 3 */
/***/ (function(module, exports) {

function makeSquareFromCorner(board, coords, position, width, height, borderColour, fillColour){
  return new Square(board, coords, position, width, height, borderColour, fillColour);
}

function makeSquareFromCenter(board, center, position, width, height, borderColour, fillColour){
  var coords = {x: center.x-width/2, y: center.y-height/2};
  return new Square(board, coords, position, width, height, borderColour, fillColour);
}

function Square(board, coords, position, width, height, borderColour, fillColour){

  this.drawContext = board.drawContext;
  this.imageContext = board.imageContext;

  this.coordinates = {x: coords.x, y: coords.y};
  this.position = {column: position.column, row: position.row};
  this.width = width;
  this.height = height;

  this.topLeft = {x: coords.x, y: coords.y};
  this.topRight = {x: coords.x + width, y: coords.y};
  this.bottomLeft = {x: coords.x, y: coords.y + height};
  this.bottomRight = {x: coords.x + width, y: coords.y + height};

  this.center = {x: coords.x + width/2, y: coords.y + height/2}

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

  newSquare.onClick = this.handleClick;
  newSquare.onHover = this.onHover;
  newSquare.onEnter = this.onEnter;
  newSquare.onLeave = this.handleLeave;

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

Helper.prototype.createInnerContainer = function(container){
  innerContainer = document.createElement("div");
  container.appendChild(innerContainer);
  innerContainer.style.height = "100%";
  return innerContainer;
}

Helper.prototype.createCanvases = function(count, width, height, className){

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

Helper.prototype.appendCanvases = function(container, canvases){
  for(var canvas of canvases){
    container.appendChild(canvas);
  }
}

module.exports = new Helper();


/***/ }),
/* 6 */
/***/ (function(module, exports) {


function Animation(framesPerSecond, frameCallBack){
  this.interval = 1000/framesPerSecond;
  this.startTime = 0;
  this.frameCallBack = frameCallBack;
}

Animation.prototype.start = function(){
  this.startTime = Date.now();
  requestAnimationFrame(this.run.bind(this));
}

Animation.prototype.run = function(){
  if(this.shouldRunNextFrame()){
    this.frameCallBack();
  }
  requestAnimationFrame(this.run.bind(this));
}

Animation.prototype.shouldRunNextFrame = function(){
  var now = Date.now();
  elapsed = now - this.startTime;
  var shouldRun = elapsed >= this.interval;
  if(shouldRun) this.startTime = now;
  return shouldRun;
}

module.exports = Animation;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

function randomInt(min, max){
  return Math.floor(Math.random() * ((max-min)+1) + min);
}

module.exports = randomInt;


/***/ })
/******/ ]);
//# sourceMappingURL=falling_squares_bundle.js.map