module.exports = {
  set(obj, pointer, value) {
    const fragments = pointer.split(/\//g);

    if (fragments.length < 2) {
      throw new Error('Cannot set value at root');
    }

    // resolve pointer
    for (let i = 1; i < fragments.length - 1; i++) {
      let current = this.unescapeFragment(fragments[i]);

      // set `-` fragment
      if (Array.isArray(obj) && current === '-') {
        current = obj.length;
      }

      // create fragment if not exists
      if (!(current in obj)) {
        const next = fragments[i + 1];
        obj[current] =
          (next !== '' && !isNaN(next)) || next === '-'
            ? [] : {};
      }

      obj = obj[current];
    }

    // get last fragment
    let last = this.unescapeFragment(
      fragments[fragments.length - 1]);

    // set `-` fragment
    if (Array.isArray(obj) && last === '-') {
      last = obj.length;
    }

    // set value at location
    obj[last] = value;

    // return value
    return value;
  },

  get(obj, pointer) {
    const fragments = pointer.split(/\//g);

    // resolve pointer
    for (let i = 1; i < fragments.length; i++) {
      let current = this.unescapeFragment(fragments[i]);

      if (!(current in obj)) {
        return undefined;
      }

      obj = obj[current];
    }

    // return value
    return obj;
  },

  delete(obj, pointer) {
    const fragments = pointer.split(/\//g);
    let parent;

    // resolve pointer
    for (let i = 1; i < fragments.length; i++) {
      let current = this.unescapeFragment(fragments[i]);

      if (!(current in obj)) {
        return undefined;
      }

      parent = obj;
      obj = obj[current];
    }

    if (!parent) {
      throw new Error('Cannot delete value at root');
    }

    // get last fragment
    const last = this.unescapeFragment(
      fragments[fragments.length - 1]);

    // delete value at location
    delete parent[last];

    // return value
    return obj;
  },

  escapeFragment(fragment) {
    fragment += '';
    if (/[~\/]/.test(fragment)) {
      fragment = fragment.replace(/[~\/]/g, m =>
        m === '~' ? '~0' : '~1');
    }
    return encodeURIComponent(fragment);
  },

  unescapeFragment(fragment) {
    fragment = decodeURIComponent(fragment + '');
    if (/~[01]/.test(fragment)) {
      fragment = fragment.replace(/~[01]/g, m =>
        m === '~0' ? '~' : '/');
    }
    return fragment;
  }
};
