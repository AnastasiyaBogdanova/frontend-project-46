import { describe, expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const currentFilename = fileURLToPath(import.meta.url);
const currentDirname = dirname(currentFilename);

const getFixturePath = (filename) => resolve(currentDirname, '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8').trim();

describe('gendiff', () => {
  test('compare flat json files', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    const expected = readFile('expected.txt');
    const result = genDiff(filepath1, filepath2);

    // Сравниваем строки, игнорируя лишние пробелы
    const normalize = (str) => str.replace(/\s+/g, ' ').trim();
    expect(normalize(result)).toEqual(normalize(expected));
  });
});
