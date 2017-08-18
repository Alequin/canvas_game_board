
function BoardEvents(board, canvas){
  this.board = board;
  this.canvas = canvas
  this.context = canvas.context;

  this.currentSquare = null;
}

BoardEvents.prototype.activateOnClick = function(){
  this.canvas.onclick = function(event){
    var square = this.board.getSquareByCoords(event.offsetX, event.offsetY);
    if(square && square.handleClick) square.handleClick(this, square);
  }.bind(this);
};

BoardEvents.prototype.activateOnHover = function(){
  this.canvas.onmousemove = function(event){
    console.log("hover");
    var x = event.offsetX;
    var y = event.offsetY;
    var square = this.board.getSquareByCoords(x, y);
    if(square){
      if(square.handleHover)square.handleHover(this, square);
      if(square !== this.currentSquare){
        if(square.handleEnter)square.handleEnter(this, square);
      }
    }

    if( this.currentSquare && ( (!square && this.currentSquare) || (square !== this.currentSquare) ) ){
      if(this.currentSquare.handleLeave){
        this.currentSquare.handleLeave(this, this.currentSquare);
      }
    }

    this.currentSquare = square;
  }.bind(this);
}

module.exports = BoardEvents;
