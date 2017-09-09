
const BackgroundCanvas = require("./background_canvas");

window.addEventListener("load", function(){
  const backgroundCanvas = new BackgroundCanvas();
  backgroundCanvas.buildCanvas();
});
