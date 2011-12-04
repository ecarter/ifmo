
/**
 * dependencies
 */

var fs = require('fs')
  , path = require('path')
  , log = require('util').log;

var command
  , directory
  , dot_files
  , files
  , options
  , recursive
  , verbose;

dot_files = false;
files = [];
recursive = false;

module.exports.findFiles = findFiles;

function findFiles (dir, opts) {
  
  opts = !opts ? {} : opts;
  
  if ( !opts.recursive ) {
    opts.recursive = false;
  }
  
  if ( !opts.dot_files ) {
    opts.dot_files = false;
  }
  
  try {
    var found = fs.readdirSync(dir);
  } catch (e) {
    console.log("Could not read directory:", dir);
    return;
  }
  
  found.forEach( function (file, i) {
    
    var filepath = path.join(dir, file);
    
    if ( file[0] === '.' && !dot_files) {
      found.splice(i, 0);
      
    } else if ( file && recursive && fs.statSync(filepath).isDirectory()) {
      findFiles(filepath);
        
    } else {
      files.push( filepath );
      
    }
    
  });
  
  return files;
}


module.exports.watchFile = watchFile;

function watchFile (file, callback) {
  
  fs.watchFile(file, function (curr, prev) {
    if (+curr.mtime !== +prev.mtime) {
      
      if ( typeof callback === 'function' ) {
        callback.call(this);
      }
      
    }
  });
  
}
