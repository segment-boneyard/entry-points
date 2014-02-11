var entries = require('..');
var equal = require('deep-equal');
var assert = require('assert');

var bin = require('./fixtures/bin');
var empty = require('./fixtures/empty');
var main = require('./fixtures/main');
var main2 = require('./fixtures/main2');
var dup = require('./fixtures/dup');

describe('entries(pkg)', function(){
  it('should default .main', function(){
    assert(equal(['index.js'], entries(empty)));
  });
  it('should add .main', function(){
    assert(equal(['foo.js'], entries(main)));
  });
  it('should add .js to .main', function(){
    assert(equal(['foo.js'], entries(main2)));
  });
  it('should add .bin scripts', function(){
    assert(equal(['index.js', 'bin/foo', 'bin/bar'], entries(bin)));
  });
  it('should filter duplicates', function(){
    assert(equal(['index.js'], entries(dup)));
  });
});
