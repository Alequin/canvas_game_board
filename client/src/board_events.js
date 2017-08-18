
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
}

BoardEvents.prototype.disableOnLeave = function(){
  this.isLeaveActive = false;
  if(this.areAnyMoveEventsActive()){
    this.canvas.onmousemove = null;
  }
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

BoardEvents.prototype.areAnyMoveEventsActive = function(){
  return this.isHoverActive || this.isEnterActive || this.isLeaveActive;
}

module.exports = BoardEvents;
