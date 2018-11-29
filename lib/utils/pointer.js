module.exports = {
  set(obj, pointer, value) {
    const schemas = pointer.split(/\//g);

    if (schemas.length < 2) {
      throw new Error('Cannot set value at root');
    }

    // resolve pointer
    for (let i = 1; i < schemas.length - 1; i++) {
      let current = this.unescapeSchema(schemas[i]);

      // set `-` schema
      if (Array.isArray(obj) && current === '-') {
        current = obj.length;
      }

      // create schema if not exists
      if (!(current in obj)) {
        const next = schemas[i + 1];
        obj[current] =
          (next !== '' && !isNaN(next)) || next === '-'
            ? [] : {};
      }

      obj = obj[current];
    }

    // get last schema
    let last = this.unescapeSchema(
      schemas[schemas.length - 1]);

    // set `-` schema
    if (Array.isArray(obj) && last === '-') {
      last = obj.length;
    }

    // set value at location
    obj[last] = value;

    // return value
    return value;
  },

  get(obj, pointer) {
    const schemas = pointer.split(/\//g);

    // resolve pointer
    for (let i = 1; i < schemas.length; i++) {
      let current = this.unescapeSchema(schemas[i]);

      if (!(current in obj)) {
        return undefined;
      }

      obj = obj[current];
    }

    // return value
    return obj;
  },

  delete(obj, pointer) {
    const schemas = pointer.split(/\//g);
    let parent;

    // resolve pointer
    for (let i = 1; i < schemas.length; i++) {
      let current = this.unescapeSchema(schemas[i]);

      if (!(current in obj)) {
        return undefined;
      }

      parent = obj;
      obj = obj[current];
    }

    if (!parent) {
      throw new Error('Cannot delete value at root');
    }

    // get last schema
    const last = this.unescapeSchema(
      schemas[schemas.length - 1]);

    // delete value at location
    delete parent[last];

    // return value
    return obj;
  },

  escapeSchema(schema) {
    schema += '';
    if (/[~\/]/.test(schema)) {
      schema = schema.replace(/[~\/]/g, m =>
        m === '~' ? '~0' : '~1');
    }
    return encodeURIComponent(schema);
  },

  unescapeSchema(schema) {
    schema = decodeURIComponent(schema + '');
    if (/~[01]/.test(schema)) {
      schema = schema.replace(/~[01]/g, m =>
        m === '~0' ? '~' : '/');
    }
    return schema;
  }
};
