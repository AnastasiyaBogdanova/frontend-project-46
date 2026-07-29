import { describe, expect, test } from '@jest/globals';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const currentFilename = fileURLToPath(import.meta.url);
const currentDirname = dirname(currentFilename);

const getFixturePath = (filename) => resolve(currentDirname, '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8').trim();

const normalize = (str) => str.replace(/\s+/g, ' ').trim();

describe('gendiff', () => {
  test('compare nested json files', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    const expected = readFile('expected_nested.txt');
    const result = genDiff(filepath1, filepath2);

    expect(normalize(result)).toEqual(normalize(expected));
  });

  test('compare nested yaml files', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file2.yml');
    const expected = readFile('expected_nested.txt');
    const result = genDiff(filepath1, filepath2);

    expect(normalize(result)).toEqual(normalize(expected));
  });
});