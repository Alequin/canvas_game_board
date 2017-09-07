var Board = require("./../board/board");
var assert = require("assert");

require('jsdom-global')();

describe("Board", function(){

  let board;

  beforeEach(function(){
    const div = document.createElement('div')
    board = new Board(div);
  })

  it("can generateSquare columns correctly", function(){
    const width = 3;
    const height = 3;
    board.generateSquares(width,height, "", "");
    assert.strictEqual(board.squares.length, width);
  });

  it("can generateSquare rows correctly", function(){
    const width = 3;
    const height = 3;
    board.generateSquares(width,height, "", "");
    for(let row of board.squares){
      assert.strictEqual(row.length, height);
    }
  });

});
