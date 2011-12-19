/**
 * Ifmo - watch
 * Copyright (C) 2011 Erin Carter ( hi@dnvsfn.com )
 * MIT Licensed
 */

/** Requires */
var fs = require('fs');

/**
 * Watches a file and executes a callback if file is modified.
 * 
 * @param {String} file Path to the file being watched
 * @param {Function} callback Function that gets
 * executed when change is found
 */

module.exports = function watch (file, callback) {
 fs.watchFile(file, function (curr, prev) {
   if (+curr.mtime !== +prev.mtime) {
     if ( typeof callback === 'function' ) {
       return callback();
     }
   }
 });
};