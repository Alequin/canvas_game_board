
function BoardEvents(board, canvas){
  this.board = board;
  this.canvas = canvas
  this.context = canvas.context;
}

BoardEvents.prototype.activateOnClick = function(){
  this.canvas.onclick = function(event){
    var square = this.board.getSquareByCoords(event.offsetX, event.offsetY);
    if(square && square.handleClick) square.handleClick(this, square);
  }.bind(this);
};

module.exports = BoardEvents;
