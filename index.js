
/**
 * Module dependencies.
 */

var join = require('path').join;
var resolve = require('path').resolve;

/**
 * Find possibly entry points in `pkg`.
 *
 * @param {Object} pkg
 * @api public
 */

module.exports = function(pkg, fn) {
  var entries = [];
  
  // main
  
  var main = pkg.main || 'index.js';
  if (!/\.js$/.test(main)) main += '.js';
  entries.push(main);

  // bins
  
  if (pkg.bin) Object.keys(pkg.bin).forEach(function(name){
    entries.push(pkg.bin[name]);
  });
  
  // filter duplicates
  
  return entries.filter(unique);
};

/**
 * Array#filter(unique) helper.
 */

function unique(el, i, arr){
  return arr.indexOf(el) == i;
}
