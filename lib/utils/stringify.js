module.exports = function stringify(value) {
  // handle primitives right away
  if (typeof value !== 'object' || value === null) {
    // stringify and return
    return JSON.stringify(value);
  }

  // weak map for detecting circular structures
  const parents = new WeakMap();

  // recursive stringify
  return (function _stringify(node) {
    // call toJSON() if exists
    if (node && node.toJSON && typeof node.toJSON === 'function') {
      node = node.toJSON();
    }

    // handle primitives
    if (typeof node !== 'object' || node === null) {
      return JSON.stringify(node);
    }

    // handle arrays
    if (Array.isArray(node)) {
      const out = [];
      for (const item of node) {
        // use null for `undefined` items
        out.push(_stringify(item) || 'null');
      }

      // stringify and return
      return `[${out.join(',')}]`;

    } else {
      if (parents.has(node)) {
        throw new TypeError('Converting circular structure to JSON');

      } else {
        parents.set(node, true);
      }

      const out = [];
      for (const property of Object.keys(node).sort()) {
        let str;
        // exclude `undefined` properties
        (str = _stringify(node[property]))
          ? out.push(`${JSON.stringify(property)}:${str}`)
          : undefined;
      }

      parents.delete(node);

      // stringify and return
      return `{${out.join(',')}}`;
    }

  })(value);
}
