import _ from 'lodash';
import parseFile from './parsers.js';
import stylish from './formatters/stylish.js';

export default function genDiff(filepath1, filepath2) {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);

  const diff = buildDiff(data1, data2);

  return stylish(diff);
}

function buildDiff(obj1, obj2) {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedKeys = _.sortBy(keys);

  return sortedKeys.map((key) => {
    const hasKey1 = Object.hasOwn(obj1, key);
    const hasKey2 = Object.hasOwn(obj2, key);
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (!hasKey1) {
      return { key, type: 'added', value: value2 };
    }
    if (!hasKey2) {
      return { key, type: 'removed', value: value1 };
    }
    // ВАЖНО: проверяем, что оба значения - объекты и не null
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, type: 'nested', children: buildDiff(value1, value2) };
    }
    if (value1 === value2) {
      return { key, type: 'unchanged', value: value1 };
    }
    return { key, type: 'changed', oldValue: value1, newValue: value2 };
  });
}