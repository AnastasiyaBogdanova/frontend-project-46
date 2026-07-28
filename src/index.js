import _ from 'lodash';
import parseFile from './parsers.js';

export default function genDiff(filepath1, filepath2, format = 'stylish') {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  const allKeys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(allKeys);

  const result = sortedKeys.map((key) => {
    const hasKey1 = Object.hasOwn(data1, key);
    const hasKey2 = Object.hasOwn(data2, key);
    const value1 = data1[key];
    const value2 = data2[key];

    if (!hasKey1) {
      return `  + ${key}: ${value2}`; // два пробела перед плюсом
    }
    if (!hasKey2) {
      return `  - ${key}: ${value1}`; // два пробела перед минусом
    }
    if (value1 === value2) {
      return `    ${key}: ${value1}`; // четыре пробела перед ключом
    }
    return `  - ${key}: ${value1}\n  + ${key}: ${value2}`; // два пробела перед плюсом/минусом
  });

  return `{\n${result.join('\n')}\n}`;
}
