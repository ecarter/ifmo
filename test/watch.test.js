var exec = require('child_process').exec
  , ifmod = require('../lib/ifmod');

var file = './test/testfile.test';

function touchFile (done){
  exec( ['echo', '"test test test"', '>>', file].join(' '), function (err, stdout, stderr) {
    if (err) return done(err);
    if (typeof done === 'function') done();
  });
}

describe('ifmod', function(){
  
  before(touchFile)
  
  after( function (done) {
    exec( ['rm', file].join(' '), function (err, stdout, stderr) {
      if (err) return done(err);
      done();
    })
  })
  
  describe('#watchFile()', function(){
    it('should should let us know the file has been modified', function(done){
      ifmod.watchFile(file, function () {
        console.log('change found');
        done();
      });
      setTimeout( function () {
        touchFile(function () { 
          console.log('touch done'); 
        });
      }, 1000);
    })
  })
})