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
  test('stylish format for nested json', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    const expected = readFile('expected_stylish.txt');
    const result = genDiff(filepath1, filepath2, 'stylish');

    const normalize = (str) => str.replace(/\s+/g, ' ').trim();
    expect(normalize(result)).toEqual(normalize(expected));
  });

  test('plain format for nested json', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    const expected = readFile('expected_plain.txt');
    const result = genDiff(filepath1, filepath2, 'plain');

    const normalize = (str) => str.split('\n').filter(line => line !== '').map(line => line.trim());
    expect(normalize(result)).toEqual(normalize(expected));
  });

  test('plain format for nested yaml', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file2.yml');
    const expected = readFile('expected_plain.txt');
    const result = genDiff(filepath1, filepath2, 'plain');

    const normalize = (str) => str.split('\n').filter(line => line !== '').map(line => line.trim());
    expect(normalize(result)).toEqual(normalize(expected));
  });

  test('json format for nested json', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    const expected = readFile('expected_json.txt');
    const result = genDiff(filepath1, filepath2, 'json');

    const normalize = (str) => str.replace(/\s+/g, ' ').trim();
    expect(normalize(result)).toEqual(normalize(expected));
  });

  test('json format for nested yaml', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file2.yml');
    const expected = readFile('expected_json.txt');
    const result = genDiff(filepath1, filepath2, 'json');

    const normalize = (str) => str.replace(/\s+/g, ' ').trim();
    expect(normalize(result)).toEqual(normalize(expected));
  });
});