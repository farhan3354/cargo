const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const output = fs.createWriteStream(path.join(__dirname, 'backend-ready.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});

output.on('close', function() {
  console.log('Backend zipped! Total bytes: ' + archive.pointer());
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);

// Zip the backend directory, ignoring node_modules
archive.glob('backend/**/*', { 
  cwd: __dirname,
  ignore: ['backend/node_modules/**', 'backend/.env'] 
});

archive.finalize();
