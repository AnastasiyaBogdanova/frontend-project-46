import _ from 'lodash';

const getIndent = (depth) => ' '.repeat(depth * 4);

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    if (value === null) return 'null';
    if (typeof value === 'string') return value;
    return String(value);
  }

  const indent = getIndent(depth);
  const lines = Object.entries(value).map(([key, val]) => {
    const formattedVal = _.isPlainObject(val) ? stringify(val, depth + 1) : val;
    return `${indent}    ${key}: ${formattedVal}`;
  });
  return `{\n${lines.join('\n')}\n${indent}}`;
};

export default function stylish(diff, depth = 0) {
  const indent = getIndent(depth);
  const lines = diff.map((node) => {
    const { key, type } = node;

    if (type === 'nested') {
      const children = stylish(node.children, depth + 1);
      return `${indent}    ${key}: {\n${children}\n${indent}    }`;
    }

    if (type === 'added') {
      const value = stringify(node.value, depth + 1);
      return `${indent}  + ${key}: ${value}`;
    }

    if (type === 'removed') {
      const value = stringify(node.value, depth + 1);
      return `${indent}  - ${key}: ${value}`;
    }

    if (type === 'changed') {
      const oldValue = stringify(node.oldValue, depth + 1);
      const newValue = stringify(node.newValue, depth + 1);
      return `${indent}  - ${key}: ${oldValue}\n${indent}  + ${key}: ${newValue}`;
    }

    // unchanged
    const value = stringify(node.value, depth + 1);
    return `${indent}    ${key}: ${value}`;
  });

  return `{\n${lines.join('\n')}\n${indent}}`;
}