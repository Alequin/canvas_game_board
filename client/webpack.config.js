var movementSquareConfig = {
  entry: __dirname + "/src/games/movement_square/run.js",
  output: {
    filename: "movement_square_bundle.js",
    path: __dirname + "/build/movement_square"
  },
  devtool: 'source-map'
}

var userMovementConfig = {
  entry: __dirname + "/src/games/user_movement/run.js",
  output: {
    filename: "user_movement_bundle.js",
    path: __dirname + "/build/user_movement"
  },
  devtool: 'source-map'
}

module.exports = [
  movementSquareConfig,
  userMovementConfig
]
