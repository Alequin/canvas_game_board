
function Block(board, squares){
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

module.exports = Block;
