
/**
 * dependencies
 */

var fs = require('fs')
  , path = require('path')
  , log = require('util').log;

var files = [];

module.exports.VERSION = '0.0.0';

module.exports.findFiles = findFiles;

function findFiles (dir, opts) {
  
  var valid_files = [];
  
  opts = !opts ? {} : opts;
  
  if ( !opts.recursive ) {
    opts.recursive = false;
  }
  
  if ( !opts.dot_files ) {
    opts.dot_files = false;
  }
  
  if ( !opts.verbose ) {
    opts.verbose = false;
  } else {
    if ( opts.verbose == true ) {
      console.log( '  options: ', JSON.stringify(opts, null, '  ') );
    }
  }
  
  try {
    var found = fs.readdirSync(dir);
  } catch (e) {
    console.log("Could not read directory:", dir);
    return;
  }
  
  found.forEach( function (file, i) {
    
    var filepath = path.join(dir, file)
      , is_dir = fs.statSync(filepath).isDirectory();
    
    if ( file.charAt(0) == '.' && !opts.dot_files) {
      found.splice(i, 0);
      
    } else if ( opts.recursive && is_dir ) {
      valid_files = valid_files.concat( findFiles(filepath, opts) );
        
    } else if ( !is_dir ){
      valid_files.push( filepath );
    }
    
  });
  
  return valid_files;
}


module.exports.watchFile = watchFile;

function watchFile (file, callback) {
  
  fs.watchFile(file, function (curr, prev) {
    if (+curr.mtime !== +prev.mtime) {
      if ( typeof callback === 'function' ) {
        return callback();
      }
    }
  });
  
}
