
function BoardEvents(board){
  this.board = board;
  this.canvas = board.clickLayer;
  this.context = this.canvas.context;
}

BoardEvents.prototype.activateOnClick = function(){
  this.canvas.addEventListener("click", function(event){
    var square = this.board.getSquareByCoords(event.offsetX, event.offsetY);
    if(square && square.handleClick) square.handleClick(this, square);
  }.bind(this));
};

module.exports = BoardEvents;
