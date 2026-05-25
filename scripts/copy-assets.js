const fs = require('fs');
const path = require('path');

try {
  // Copy .next/static to .next/standalone/.next/static
  const srcStatic = path.join(__dirname, '../.next/static');
  const destStatic = path.join(__dirname, '../.next/standalone/.next/static');
  if (fs.existsSync(srcStatic)) {
    fs.mkdirSync(path.dirname(destStatic), { recursive: true });
    fs.cpSync(srcStatic, destStatic, { recursive: true });
    console.log('Successfully copied .next/static to .next/standalone/.next/static');
  }

  // Copy public to .next/standalone/public
  const srcPublic = path.join(__dirname, '../public');
  const destPublic = path.join(__dirname, '../.next/standalone/public');
  if (fs.existsSync(srcPublic)) {
    fs.mkdirSync(path.dirname(destPublic), { recursive: true });
    fs.cpSync(srcPublic, destPublic, { recursive: true });
    console.log('Successfully copied public to .next/standalone/public');
  }
} catch (err) {
  console.error('Error copying build assets:', err);
  process.exit(1);
}
