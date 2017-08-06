window.addEventListener("load", function(){

  var canvas = document.getElementById("main-canvas");
  var context = canvas.getContext("2d");
  console.log(context);


  makeSquaresHorizontal(context, 10);
});

function makeSquaresHorizontal(context, count){

  var width = context.canvas.width;
  var squareWidth = width / count;

  for(var j=0; j<width; j+=squareWidth){
    context.rect(j, 0, squareWidth, squareWidth);
  }
  context.stroke();
}
