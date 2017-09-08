
function Config(name){
  this.configObject = {
    entry: __dirname + `/src/games/${name}/run.js`,
    output: {
      filename: `${name}_bundle.js`,
      path: __dirname + `/build/${name}`
    },
    devtool: 'source-map'
  }
}


var fallingSquaresConfig = new Config("falling_squares");
var movementSquareConfig = new Config("movement_square");
var userMovementConfig = new Config("user_movement");

module.exports = [
  fallingSquaresConfig.configObject,
  movementSquareConfig.configObject,
  userMovementConfig.configObject
]
