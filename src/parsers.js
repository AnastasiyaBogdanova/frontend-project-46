import fs from 'fs';
import path from 'path';

export default function parseFile(filepath) {
  const fullPath = path.resolve(process.cwd(), filepath);
  const content = fs.readFileSync(fullPath, 'utf-8');

  const extension = path.extname(filepath).toLowerCase();

  if (extension === '.json') {
    return JSON.parse(content);
  }

  throw new Error(`Unsupported file format: ${extension}`);
}
