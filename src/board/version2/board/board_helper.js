function Helper(){}

Helper.createInnerContainer = function(container){
  innerContainer = document.createElement("div");
  container.appendChild(innerContainer);
  innerContainer.style.height = "100%";
  return innerContainer;
}

Helper.createCanvases = function(count, width, height, className){

  result = []

  for(var j=0; j<count; j++){
    var canvas = document.createElement("canvas");

    canvas.classList.add(className);

    canvas.width = width;
    canvas.height = height;

    result.push(canvas);
  }

  return result;
}

Helper.appendCanvases = function(container, canvases){
  for(var canvas of canvases){
    container.appendChild(canvas);
  }
}

module.exports = Helper;
