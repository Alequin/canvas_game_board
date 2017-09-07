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

  it("can copy matrix of squares", function(){
    const width = 3;
    const height = 3;
    board.generateSquares(width,height, "", "");

    const squares = board.squares;
    const copiedSquares = board.copySquares(squares);

    for(let columnIndex in squares){
      for(let rowIndex in squares[columnIndex]){
        const square = squares[columnIndex][rowIndex];
        const copiedSquare = copiedSquares[columnIndex][rowIndex];
        assert.notStrictEqual(square, copiedSquare);
        assert.strictEqual(square.coordinates.x, copiedSquare.coordinates.x);
        assert.strictEqual(square.coordinates.y, copiedSquare.coordinates.y);
        assert.strictEqual(square.position.x, copiedSquare.position.x);
        assert.strictEqual(square.position.y, copiedSquare.position.y);
        assert.strictEqual(square.width.y, copiedSquare.width.y);
        assert.strictEqual(square.height.y, copiedSquare.height.y);
      }
    }

  });
});
