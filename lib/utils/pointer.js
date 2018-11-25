module.exports = {
  set(obj, pointer, value) {
    const segments = pointer.split(/\//g);
    let last = segments[segments.length - 1];

    if (segments.length < 2) {
      throw new Error('Cannot set value at root');
    }

    // resolve pointer
    for (let i = 1; i < segments.length - 1; i++) {
      const current = segments[i];

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
      if (!(segments[i] in obj)) {
        return undefined;
      }

      obj = obj[segments[i]];
    }

    // return value
    return obj;
  },

  delete(obj, pointer) {
    const segments = pointer.split(/\//g);
    let parent;

    // resolve pointer
    for (let i = 1; i < segments.length; i++) {
      if (!(segments[i] in obj)) {
        return undefined;
      }

      parent = obj;
      obj = obj[segments[i]];
    }

    if (!parent) {
      throw new Error('Cannot delete value at root');
    }

    // delete value at location
    delete parent[segments[segments.length - 1]];

    // return value
    return obj;
  }
};
