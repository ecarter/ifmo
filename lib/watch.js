
/**
 * requires
 */
var fs = require('fs');

/**
 * ifmo.watch()
 * 
 * @param {String} file path/to/file
 * @param {Function} callback what to do if modification is found
 */

var watch = module.exports = function (file, callback) {

 fs.watchFile(file, function (curr, prev) {
   if (+curr.mtime !== +prev.mtime) {
     if ( typeof callback === 'function' ) {
       return callback();
     }
   }
 });

};