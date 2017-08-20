var playerMovementConfig = {
  entry: __dirname + "/src/games/user_movement/run.js",
  output: {
    filename: "player_movement_bundle.js",
    path: __dirname + "/build"
  },
  devtool: 'source-map'
}

module.exports = [
  playerMovementConfig
]
