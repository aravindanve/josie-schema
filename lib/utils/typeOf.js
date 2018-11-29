module.exports = function typeOf(data) {
  let type = typeof data;

  switch (type) {
    case 'string': break;
    case 'number':
      if (Number.isInteger(data)) {
        type = 'integer';
      }
      break;

    case 'object':
      if (data === null) {
        type = 'null';

      } else if (Array.isArray(data)) {
        type = 'array';
      }
      break;
  }

  return type;
}
