var find = require('..');
var equal = require('deep-equal');
var assert = require('assert');

describe('entries(path, fn)', function(){
  it('should default .main', function(done){
    find(__dirname + '/fixtures/empty', function(err, entries){
      if (err) return done(err);
      assert(equal(['index.js'], entries));
      done();
    });
  });
  it('should add .main', function(done){
    find(__dirname + '/fixtures/main', function(err, entries){
      if (err) return done(err);
      assert(equal(['foo.js'], entries));
      done();
    });
  });
  it('should add .js to .main', function(done){
    find(__dirname + '/fixtures/main2', function(err, entries){
      if (err) return done(err);
      assert(equal(['foo.js'], entries));
      done();
    });
  });
  it('should add .json to .main', function(done){
    find(__dirname + '/fixtures/main3', function(err, entries){
      if (err) return done(err);
      assert(equal(['foo.json'], entries));
      done();
    });
  });
  it('should add .bin scripts', function(done){
    find(__dirname + '/fixtures/bin', function(err, entries){
      if (err) return done(err);
      assert(equal(['bin/foo', 'bin/bar'], entries));
      done();
    });
  });
  it('should filter duplicates', function(done){
    find(__dirname + '/fixtures/dup', function(err, entries){
      if (err) return done(err);
      assert(equal(['index.js'], entries));
      done();
    });
  });
});
