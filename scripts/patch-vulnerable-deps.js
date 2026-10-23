#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');

const patches = [];
const warnings = [];

function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (_) {
    return false;
  }
}

function patchFile(relativePath, patchers) {
  const filePath = path.join(projectRoot, relativePath);
  if (!fileExists(filePath)) {
    warnings.push(`Skipped missing dependency file: ${relativePath}`);
    return;
  }

  const original = fs.readFileSync(filePath, 'utf8');
  let updated = original;

  for (const patcher of patchers) {
    updated = patcher(updated, relativePath);
  }

  if (updated !== original) {
    fs.writeFileSync(filePath, updated);
    patches.push(relativePath);
  }
}

function replaceSnippet({ name, vulnerable, patched, alreadyPatched }) {
  return (content, relativePath) => {
    const patchedMarkers = Array.isArray(alreadyPatched) ? alreadyPatched : [alreadyPatched].filter(Boolean);
    if (patchedMarkers.some(marker => content.includes(marker))) {
      return content;
    }

    if (!content.includes(vulnerable)) {
      warnings.push(`Patch target not found for ${name} in ${relativePath}; dependency may already include an upstream fix.`);
      return content;
    }

    return content.replace(vulnerable, patched);
  };
}

const liquidStripHtmlPatch = replaceSnippet({
  name: 'LiquidJS strip_html newline/ReDoS hardening',
  vulnerable: "return str.replace(/<script[\\s\\S]*?<\\/script>|<style[\\s\\S]*?<\\/style>|<.*?>|<!--[\\s\\S]*?-->/g, '');",
  patched: "return str.replace(/<script\\b[^<]*(?:<(?!\\/script>)[^<]*)*<\\/script>|<style\\b[^<]*(?:<(?!\\/style>)[^<]*)*<\\/style>|<!--[^-]*(?:-(?!->)[^-]*)*-->|<[^>]*>/gi, '');",
  alreadyPatched: [
    "<script\\b[^<]*(?:<(?!\\/script>)[^<]*)*<\\/script>",
    "const blocks = new Map([['<script', '</script>']"
  ]
});

const liquidSpawnPatch = replaceSnippet({
  name: 'LiquidJS Context.spawn ownPropertyOnly propagation',
  vulnerable: `            strictVariables: this.strictVariables
        }, {`,
  patched: `            strictVariables: this.strictVariables,
            ownPropertyOnly: this.ownPropertyOnly
        }, {`,
  alreadyPatched: 'ownPropertyOnly: this.ownPropertyOnly'
});

for (const liquidBundle of [
  'node_modules/liquidjs/dist/liquid.node.js',
  'node_modules/liquidjs/dist/liquid.node.mjs'
]) {
  patchFile(liquidBundle, [liquidStripHtmlPatch, liquidSpawnPatch]);
}

patchFile('node_modules/@11ty/eleventy/src/UserConfig.js', [
  replaceSnippet({
    name: 'Eleventy js-yaml v5 ESM interop',
    vulnerable: 'import yaml from "js-yaml";',
    patched: 'import * as yamlNs from "js-yaml";\nconst yaml = yamlNs.default ?? yamlNs;',
    alreadyPatched: [
      'import * as yamlNs from "js-yaml";',
      'const yaml = yamlNs.default ?? yamlNs;'
    ]
  })
]);

if (patches.length > 0) {
  console.log(`Applied dependency security patches: ${patches.join(', ')}`);
}

if (warnings.length > 0) {
  for (const warning of warnings) {
    console.warn(warning);
  }
}


