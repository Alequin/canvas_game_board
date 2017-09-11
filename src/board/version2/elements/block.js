
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
