const jewel = require('./utils/jewel');

module.exports = {
  parse(root) {
    const seen = new WeakMap();

    return (function _parse(json, parent, key) {
      let _json;

      // call toJSON if exists
      if (json && typeof json.toJSON === 'function') {
        _json = json;
        json = json.toJSON();
      }

      // handle primitives
      if (typeof json !== 'object' || json === null) {
        return json;
      }

      // handle circular reference
      if (seen.has(_json || json)) {
        throw new Error('Circular reference detected');
      }

      // create edge
      const IS_ARRAY = Array.isArray(json);
      const ENTRIES = IS_ARRAY ? [] : {};
      const edge = {
        IS_COMPILED: false,
        IS_ARRAY,
        JEWEL: jewel,
        ROOT: undefined,
        PARENT: parent,
        KEY: key,
        BASE_ID: undefined,
        REF: undefined,
        REFFED: undefined,
        ENTRIES
      };

      // set root
      edge.ROOT = parent ? parent.ROOT : edge;

      // set seen
      seen.set(_json || json, true);

      // handle arrays and objects
      if (IS_ARRAY) {
        const length = json.length;

        for (let i = 0; i < length; i++) {
          ENTRIES.push(_parse(json[i], edge, i));
        }

      } else {
        const keys = Object.keys(json);
        const length = keys.length;

        for (let i = 0; i < length; i++) {
          const key = keys[i];

          ENTRIES[key] = _parse(json[key], edge, key);
        }
      }

      // clear seen
      seen.delete(_json || json);

      // return edge
      return edge;

    })(root);
  }
};
