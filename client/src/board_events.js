
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
  this.canvas.onclick = function(event){
    var square = this.board.getSquareByCoords(event.offsetX, event.offsetY);
    if(square && square.handleClick) square.handleClick(this, square);
  }.bind(this);
};

BoardEvents.prototype.activateOnHover = function(){
  if(!this.canvas.onmousemove) setOnMouseMove(this.board, this.canvas);
  this.isHoverActive = true;
}

function setOnMouseMove(board, canvas){
  canvas.onmousemove = function(event){
    var square = board.getSquareByCoords(event.offsetX, event.offsetY);
    
    if(square){

      if(this.isHoverActive && square.handleHover){
        square.handleHover(this, square);
      }

      if(this.isEnterActive && square !== this.currentSquare){
        if(square.handleEnter)square.handleEnter(this, square);
      }

    }

    if(this.isLeaveActive && this.currentSquare && ( (!square && this.currentSquare) || (square !== this.currentSquare) ) ){
      if(this.currentSquare.handleLeave){
        this.currentSquare.handleLeave(this, this.currentSquare);
      }
    }

    this.currentSquare = square;
  }.bind(this);
}

module.exports = BoardEvents;
