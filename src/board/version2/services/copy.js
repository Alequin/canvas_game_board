
module.exports = function(object){
  const newObject = {};
  for(let key of Object.keys(object)){
    newObject[key] = object[key];
  }
  return newObject;
}
