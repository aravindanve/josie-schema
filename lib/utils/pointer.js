module.exports = {
  set(obj, pointer, value) {
    const segments = pointer.split(/\//g);

    if (segments.length < 2) {
      throw new Error('Cannot set value at root');
    }

    // resolve pointer
    for (let i = 1; i < segments.length - 1; i++) {
      let current = this.unescapeSegment(segments[i]);

      // set `-` segment
      if (Array.isArray(obj) && current === '-') {
        current = obj.length;
      }

      // create segment if not exists
      if (!(current in obj)) {
        const next = segments[i + 1];
        obj[current] =
          (next !== '' && !isNaN(next)) || next === '-'
            ? [] : {};
      }

      obj = obj[current];
    }

    // get last segment
    let last = this.unescapeSegment(
      segments[segments.length - 1]);

    // set `-` segment
    if (Array.isArray(obj) && last === '-') {
      last = obj.length;
    }

    // set value at location
    obj[last] = value;

    // return value
    return value;
  },

  get(obj, pointer) {
    const segments = pointer.split(/\//g);

    // resolve pointer
    for (let i = 1; i < segments.length; i++) {
      let current = this.unescapeSegment(segments[i]);

      if (!(current in obj)) {
        return undefined;
      }

      obj = obj[current];
    }

    // return value
    return obj;
  },

  delete(obj, pointer) {
    const segments = pointer.split(/\//g);
    let parent;

    // resolve pointer
    for (let i = 1; i < segments.length; i++) {
      let current = this.unescapeSegment(segments[i]);

      if (!(current in obj)) {
        return undefined;
      }

      parent = obj;
      obj = obj[current];
    }

    if (!parent) {
      throw new Error('Cannot delete value at root');
    }

    // get last segment
    const last = this.unescapeSegment(
      segments[segments.length - 1]);

    // delete value at location
    delete parent[last];

    // return value
    return obj;
  },

  escapeSegment(segment) {
    segment += '';
    if (segment.match(/[~\/]/g)) {
      segment = segment.replace(/[~\/]/g, m =>
        m === '~' ? '~0' : '~1');
    }
    return segment;
  },

  unescapeSegment(segment) {
    segment += '';
    if (segment.match(/~[01]/g)) {
      segment = segment.replace(/~[01]/g, m =>
        m === '~0' ? '~' : '/');
    }
    return segment;
  }
};
