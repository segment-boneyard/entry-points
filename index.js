
/**
 * Module dependencies.
 */

var join = require('path').join;
var resolve = require('path').resolve;
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
  
  // pkg
  
  fs.readFile(join(path, 'package.json'), function(err, json){
    if (err) return fn(err);
    
    try {
      var pkg = JSON.parse(json);
    } catch (err) {
      return fn(err);
    }
    
    // main
    
    var main = pkg.main || 'index.js';
    
    // add .js or .json
    
    if (/\.js$/.test(main)) {
      onmain(main);
    } else {
      fs.stat(join(path, main + '.js'), function(err){
        if (!err) return onmain(main + '.js');
        
        fs.stat(join(path, main + '.json'), function(err){
          if (!err) return onmain(main + '.json');
          fn(err);
        });
      });
    }
    
    function onmain(main){
      entries.push(main);
      
      // bins
      
      if (pkg.bin) Object.keys(pkg.bin).forEach(function(name){
        entries.push(pkg.bin[name]);
      });
      
      // filter duplicates
      
      fn(null, entries.filter(unique));
    }
  });
};

/**
 * Array#filter(unique) helper.
 */

function unique(el, i, arr){
  return arr.indexOf(el) == i;
}
