import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, resolve, sep } from 'node:path';

const root = resolve('public');
const types = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
};
createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const path = resolve(root, `.${pathname === '/' ? '/index.html' : pathname}`);
    if (!path.startsWith(root + sep) || !(await stat(path)).isFile()) {
      response.writeHead(404).end();
      return;
    }
    response.setHeader('Content-Type', types[extname(path)] ?? 'application/octet-stream');
    createReadStream(path).pipe(response);
  } catch {
    response.writeHead(404).end();
  }
}).listen(6006, '127.0.0.1');
