var find = require('..');
var equal = require('deep-equal');
var assert = require('assert');
var resolve = require('path').resolve;
var join = require('path').join;

var fixtures = {
  'empty': ['index.js'],
  'main': ['foo.js'],
  'json': ['foo.json'],
  'main2': ['foo.js'],
  'main3': ['foo.json'],
  'bin': ['bin/foo', 'bin/bar'],
  'dup': ['index.js'],
  'lib': ['lib/index.js'],
  'lib2': ['lib/index.js']
};

describe('entries(path, fn)', function(){
  Object.keys(fixtures).forEach(function(name){
    var entries = fixtures[name];
    
    it('should handle ' + name, function(done){
      find(join(__dirname, 'fixtures', name), function(err, _entries){
        if (err) return done(err);
        assert(equal(_entries, entries.map(function(entry){
          return join(__dirname, 'fixtures', name, entry);
        })));
        done();
      });
    });
  });
});
