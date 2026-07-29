import stylish from './stylish.js';
import plain from './plain.js';

export default (diff, formatName) => {
  switch (formatName) {
    case 'plain':
      return plain(diff);
    case 'stylish':
    default:
      return stylish(diff);
  }
};