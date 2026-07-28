import { readFileSync, writeFileSync } from 'fs';

// The published package root is the flattened contents of dist/, so paths are
// relative to dist/ (not ./dist/...). The build emits ES modules, so the
// package must declare itself as such for consumers to resolve the ESM-only
// dependencies.
const path = new URL('../dist/package.json', import.meta.url);
const pkg = JSON.parse(readFileSync(path, 'utf8'));

pkg.type = 'module';
pkg.main = './index.js';
pkg.module = './index.js';
pkg.types = './index.d.ts';

writeFileSync(path, `${JSON.stringify(pkg, null, 2)}\n`);
