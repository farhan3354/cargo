const fs = require('fs');
const path = require('path');

const nextDir = path.join(__dirname, '../.next');

try {
  if (fs.existsSync(nextDir)) {
    fs.rmSync(nextDir, { recursive: true, force: true });
    console.log('Removed existing .next directory');
  }
} catch (err) {
  console.error('Error cleaning .next directory:', err);
  process.exit(1);
}