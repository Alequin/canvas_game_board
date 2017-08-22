var Board = require("./../board/board");
var assert = require("assert");

require('jsdom-global')();

describe("test", function(){

  it("should do something", function(){
    var div = document.createElement('div')
    var board = new Board(div);
    assert.strictEqual(!board, false);
  });

});
