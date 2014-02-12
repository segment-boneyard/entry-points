
/**
 * Module dependencies.
 */

var presolve = require('path').resolve;
var resolve = require('resolve');
var join = require('path').join;
var fs = require('fs');

/**
 * Find possibly entry points for the module in `path`.
 *
 * @param {String} path
 * @param {Function} fn
 * @api public
 */

module.exports = function(path, fn) {
  var entries = [];
  var opts = {
    extensions: ['.js', '.json']
  };
  
  resolve(path, opts, function(err, main){
    if (!err) entries.push(main);
    
    fs.readFile(join(path, 'package.json'), function(err, json){
      if (err) return fn(err);
      
      try {
        var pkg = JSON.parse(json);
      } catch (err) {
        return fn(err);
      }

      // bins
      
      if (pkg.bin) Object.keys(pkg.bin).forEach(function(name){
        entries.push(presolve(join(path, pkg.bin[name])));
      });
      
      // filter duplicates
      
      fn(null, entries.filter(unique));
    });
  });
};

/**
 * Array#filter(unique) helper.
 */

function unique(el, i, arr){
  return arr.indexOf(el) == i;
}
