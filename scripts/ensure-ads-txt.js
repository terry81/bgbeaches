#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// ads.txt content
const adsContent = 'google.com, pub-9036157436023559, DIRECT, f08c47fec0942fa0\n';

// Ensure ads.txt exists in root (source)
const rootAdsPath = path.join(__dirname, '..', 'ads.txt');
if (!fs.existsSync(rootAdsPath)) {
  fs.writeFileSync(rootAdsPath, adsContent);
  console.log('✓ Created ads.txt in root directory');
} else {
  console.log('✓ ads.txt already exists in root directory');
}

// Ensure ads.txt exists in _site (output)
const siteAdsPath = path.join(__dirname, '..', '_site', 'ads.txt');
const siteDir = path.dirname(siteAdsPath);

// Create _site directory if it doesn't exist
if (!fs.existsSync(siteDir)) {
  fs.mkdirSync(siteDir, { recursive: true });
  console.log('✓ Created _site directory');
}

// Write ads.txt to _site
fs.writeFileSync(siteAdsPath, adsContent);
console.log('✓ ads.txt created/updated in _site directory');

