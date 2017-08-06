window.addEventListener("load", function(){

  var canvas = document.getElementById("main-canvas");
  var context = canvas.getContext("2d");
  console.log(context);


  makeSquares(context, 10, 10);
});

function makeSquaresHorizontal(context, count){

  var width = context.canvas.width;
  var squareWidth = width / count;

  for(var j=0; j<width; j+=squareWidth){
    context.rect(j, 0, squareWidth, squareWidth);
  }
  context.stroke();
}

function makeSquares(context, xCount, yCount){

  var width = context.canvas.width;
  var height = context.canvas.height;

  var squareWidth = width / xCount;
  var squareHeight = height / yCount;

  for(var y=0; y<height; y+=squareHeight){
    for(var x=0; x<width; x+=squareWidth){
      context.rect(x, y, squareWidth, squareHeight);
    }
  }

  context.stroke();
}
