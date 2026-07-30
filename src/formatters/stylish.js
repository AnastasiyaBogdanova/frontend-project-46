import _ from 'lodash';

const getIndent = (depth) => ' '.repeat(depth * 4);

const formatValue = (value, depth = 0) => {
  if (value === null) return 'null';
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  if (typeof value === 'boolean') return String(value);

  if (_.isPlainObject(value)) {
    const indent = getIndent(depth);
    const entries = Object.entries(value);
    const parts = entries.map(([key, val]) => {
      const formatted = _.isPlainObject(val) ? formatValue(val, depth + 1) : val;
      return `${indent}    ${key}: ${formatted}`;
    });
    return `{\n${parts.join('\n')}\n${indent}}`;
  }

  return String(value);
};

const renderLines = (diff, depth) => {
  const indent = getIndent(depth);
  const lines = diff.map((node) => {
    const { key, type } = node;

    if (type === 'nested') {
      const childrenLines = renderLines(node.children, depth + 1);
      const childrenStr = childrenLines.join('\n');
      return `${indent}    ${key}: {\n${childrenStr}\n${indent}    }`;
    }

    if (type === 'added') {
      return `${indent}  + ${key}: ${formatValue(node.value, depth + 1)}`;
    }

    if (type === 'removed') {
      return `${indent}  - ${key}: ${formatValue(node.value, depth + 1)}`;
    }

    if (type === 'changed') {
      return `${indent}  - ${key}: ${formatValue(node.oldValue, depth + 1)}\n${indent}  + ${key}: ${formatValue(node.newValue, depth + 1)}`;
    }

    // unchanged
    return `${indent}    ${key}: ${formatValue(node.value, depth + 1)}`;
  });

  return lines;
};

export default function stylish(diff, depth = 0) {
  const lines = renderLines(diff, depth);
  const indent = getIndent(depth);
  return `{\n${lines.join('\n')}\n${indent}}`;
}