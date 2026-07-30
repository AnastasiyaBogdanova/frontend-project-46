import _ from 'lodash';

const formatValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (value === null) {
    return 'null';
  }
  return String(value);
};

export default function plain(diff, parentPath = '') {
  const lines = diff
    .filter((node) => node.type !== 'unchanged')
    .map((node) => {
      const key = node.key;
      const fullPath = parentPath ? `${parentPath}.${key}` : key;

      switch (node.type) {
        case 'added':
          return `Property '${fullPath}' was added with value: ${formatValue(node.value)}`;
        case 'removed':
          return `Property '${fullPath}' was removed`;
        case 'changed':
          return `Property '${fullPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
        case 'nested':
          return plain(node.children, fullPath);
        default:
          return null;
      }
    })
    .filter((line) => line !== null)
    .flat();

  return lines.join('\n');
}