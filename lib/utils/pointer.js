const jewel = require('./jewel');

module.exports = {
  find(edge, pointer) {
    const path = pointer.split(/\//g);
    const length = path.length;

    // check root pointer
    if (path.length === 1) {
      return edge;
    }

    // look for empty second part
    if (path[1] === '') {
      return edge;
    }

    // resolve path
    for (let i = 1; i < length; i++) {
      let current = this.unescape(path[i]);

      if (!(edge && edge.JEWEL === jewel)) {
        throw new Error(`Invalid node at ${
          parts.slice(0, i).join('/')}`);
      }

      edge = edge.ENTRIES[current];
    }

    // check edge or primitive is defined
    if (edge === undefined) {
      throw new Error(`Invalid pointer ${pointer}`);
    }

    // return edge
    return edge;
  },

  escape(pointer) {
    // make sure pointer is string
    pointer += '';

    // escape
    if (/[~\/]/.test(pointer)) {
      pointer = pointer.replace(/[~\/]/g, m =>
        m === '~' ? '~0' : '~1');
    }

    // encode uri compoment and return
    return encodeURIComponent(pointer);
  },

  unescape(pointer) {
    // decoode uri component
    pointer = decodeURIComponent(pointer + '');

    // unescape
    if (/~[01]/.test(pointer)) {
      pointer = pointer.replace(/~[01]/g, m =>
        m === '~0' ? '~' : '/');
    }

    // return pointer
    return pointer;
  }
};
