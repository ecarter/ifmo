var exec = require('child_process').exec
  , ifmod = require('../');

var dir = './test/test_find_dir'
  , test_files = [
    "test/test_find_dir/recurdir/anotherdir/another-recur.test"
  , "test/test_find_dir/recurdir/recur.test"
  , "test/test_find_dir/testfile.test"
  ];

describe('ifmod - find', function(){
  
  before(function(done){
    
    var cmd = [
      ['mkdir ', dir].join('')
    , ['mkdir ', dir, '/recurdir'].join('')
    , ['mkdir ', dir, '/recurdir/anotherdir'].join('')
    ];
    
    for (var i=0; i < test_files.length; i++) {
      cmd.push( ['touch ', test_files[i] ].join('') );
    }
    
    cmd = cmd.join('&&');
    
    exec(cmd, function (err, stdout, stderr) {
      if (err) done(err);
      done();
    })
  })
  
  after(function(done){
    exec( ['rm -rv', dir].join(' '), function (err, stdout, stderr) {
      if (err) done(err);
      done();
    });
  })
  
  describe('#find()', function(){
    
    it('should return a single file', function (done) {
      var files = ifmod.find( dir, { recursive: false } );
      files.should.have.length(1);
      files[0].should.eql( test_files[2] );
      done();
    })
    
  })
  
  describe('#find() - recursive', function(){
    
    it('should return a none-recursive list of test files', function (done) {
      var files = ifmod.find( dir, { recursive: true } );
      files.should.have.length(3);
      files[0].should.eql( test_files[0] );
      files[1].should.eql( test_files[1] );
      files[2].should.eql( test_files[2] );
      done();
    })
    
  })
  
})