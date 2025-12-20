const fs = require('fs');
const path = require('path');

const adsContent = 'google.com, pub-9036157436023559, DIRECT, f08c47fec0942fa0';
const adsFilePath = path.join(__dirname, '../_site/ads.txt');

// Ensure _site directory exists
const siteDir = path.join(__dirname, '../_site');
if (!fs.existsSync(siteDir)) {
  fs.mkdirSync(siteDir, { recursive: true });
}

// Write ads.txt file
fs.writeFileSync(adsFilePath, adsContent, 'utf8');
console.log('✓ ads.txt file created/updated successfully');

