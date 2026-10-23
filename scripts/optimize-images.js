#!/usr/bin/env node
'use strict';

const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');

const albums = path.join(__dirname, '..', '_site', 'albums');

async function* images(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) yield* images(filename);
    else if (entry.isFile() && /\.(?:jpe?g|png)(?:_TN)?$/i.test(entry.name)) yield filename;
  }
}

async function main() {
  let originalBytes = 0;
  let jpegBytes = 0;
  let webpBytes = 0;
  let count = 0;
  let skipped = 0;

  console.log('Optimizing album images (this may take a minute)...');
  for await (const filename of images(albums)) {
    const webpFilename = `${filename}.webp`;
    try {
      if ((await fs.stat(webpFilename)).mtimeMs >= (await fs.stat(filename)).mtimeMs) {
        skipped++;
        if ((count + skipped) % 100 === 0) console.log(`Processed ${count + skipped} album images...`);
        continue;
      }
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }

    const original = await fs.readFile(filename);
    const format = (await sharp(original).metadata()).format;
    const webp = await sharp(original).webp({ quality: 75, effort: 4 }).toBuffer();

    let outputBytes = original.length;
    if (format === 'jpeg') {
      const optimized = await sharp(original).jpeg({ quality: 78, mozjpeg: true }).toBuffer();
      if (optimized.length < original.length) {
        await fs.writeFile(filename, optimized);
        outputBytes = optimized.length;
      }
    }
    await fs.writeFile(webpFilename, webp);
    originalBytes += original.length;
    jpegBytes += outputBytes;
    webpBytes += webp.length;
    count++;
    if ((count + skipped) % 100 === 0) console.log(`Processed ${count + skipped} album images...`);
  }

  const mb = bytes => (bytes / 1024 / 1024).toFixed(1);
  console.log(`Optimized ${count} photos (${skipped} unchanged): originals ${mb(originalBytes)} MB, compatible images ${mb(jpegBytes)} MB, WebP ${mb(webpBytes)} MB`);
}

module.exports = main;

if (require.main === module) {
  main().catch(error => {
    console.error(error);
    process.exitCode = 1;
  });
}
