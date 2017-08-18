
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
    if(square && square.handleClick) square.handleClick(this.board, square);
  }.bind(this);
};

BoardEvents.prototype.activateOnHover = function(){
  if(!this.canvas.onmousemove) this.setOnMouseMove();
  this.isHoverActive = true;
}

BoardEvents.prototype.activateOnEnter = function(){
  if(!this.canvas.onmousemove) this.setOnMouseMove();
  this.isEnterActive = true;
}

BoardEvents.prototype.activateOnLeave = function(){
  if(!this.canvas.onmousemove) this.setOnMouseMove();
  this.isLeaveActive = true;
}

BoardEvents.prototype.setOnMouseMove = function(){
  this.canvas.onmousemove = function(event){
    var square = this.board.getSquareByCoords(event.offsetX, event.offsetY);

    if(square){

      if(this.isHoverActive){
        if(square.handleHover) square.handleHover(this.board, this.square);
      }

      if(this.isEnterActive && square !== this.currentSquare){
        if(square.handleEnter) square.handleEnter(this.board, this.square);
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

module.exports = BoardEvents;
