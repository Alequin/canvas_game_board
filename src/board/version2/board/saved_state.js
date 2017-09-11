
function SavedState(board){
  this.squares = board.copySquares(board.squares);
}

module.exports = SavedState;
