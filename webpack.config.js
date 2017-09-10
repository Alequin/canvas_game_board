
var homepageConfig = {
  entry: __dirname + `/homepage/javascript/homepage_run.js`,
  output: {
    filename: `homepage_bundle.js`,
    path: __dirname
  },
  devtool: 'source-map'
}

function Config(name){
  this.configObject = {
    entry: __dirname + `/src/games/${name}/run.js`,
    output: {
      filename: `${name}_bundle.js`,
      path: __dirname + `/canvas_games/${name}`
    },
    devtool: 'source-map'
  }
}

var fallingSquaresConfig = new Config("falling_squares");
var movementSquareConfig = new Config("movement_square");
var userMovementConfig = new Config("user_movement");
var userMovementConfig = new Config("test_board_v2");

module.exports = [
  homepageConfig,
  fallingSquaresConfig.configObject,
  movementSquareConfig.configObject,
  userMovementConfig.configObject
]
