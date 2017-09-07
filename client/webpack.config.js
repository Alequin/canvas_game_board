var playerMovementConfig = {
  entry: __dirname + "/src/games/user_movement/run.js",
  output: {
    filename: "user_movement_bundle.js",
    path: __dirname + "/build/user_movement"
  },
  devtool: 'source-map'
}

module.exports = [
  playerMovementConfig
]
