var exec = require('child_process').exec
  , ifmod = require('../');

var file = './test/testfile.test';

function touchFile (done){
  exec( ['echo', '"test test test"', '>>', file].join(' '), function (err, stdout, stderr) {
    if (err) return done(err);
    if (typeof done === 'function') done();
  });
}

describe('ifmod - watch', function(){
  
  before(touchFile)
  
  after( function (done) {
    exec( ['rm', file].join(' '), function (err, stdout, stderr) {
      if (err) return done(err);
      done();
    })
  })
  
  describe('#watch()', function(){
    it('should should let us know the file has been modified', function(done){
      ifmod.watch(file, function () {
        done();
      });
      setTimeout( function () {
        touchFile(function () { 
          console.log(file, 'touched'); 
        });
      }, 1000);
    })
  })
})