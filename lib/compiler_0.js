const clone = require('./utils/clone');

function getPaths(parentPaths, key, $id) {
  // parent path could be:
  // http://example.com/root.json#/definitions/B
  // and if $id = other.json,
  // one of the resulting paths, amongst others, must be
  // http://example.com/other.json
}

const self = {
  compile(schema) {
    // define global context
    const gctx = {
      sctx: undefined,
      uris: new Map(),
      refs: []
    };

    // walk through schema and build meta companions
    (function walk(node, metaParent, metaKey) {
      // skip primitives
      if (typeof node !== 'object' || node === null) {
        return;
      }

      // set is object flag
      const isObject = !Array.isArray(node);

      // handle $ref
      if (isObject && node.$ref) {
        gctx.refs.push({
          uri: node.$ref,
          parent: metaParent,
          key: metaKey
        });

        // skip other children
        return;
      }

      // create meta
      const meta = metaParent[metaKey] = isObject ? {} : [];

      // define meta properties
      meta.parent = metaParent;
      meta.key = metaKey;
      meta.node = node;
      meta.paths = getPaths(metaParent.paths, metaKey, node.$id);

      // set path references
      for (let i = 0, l = meta.paths.length; i < l; i++) {
        const uri = meta.paths[i];

        // check for duplicate uris before setting reference
        if (!gctx.uris.has(uri)) {
          gctx.uris.set(uri, meta);

        } else {
          throw new Error(`Duplicate URI ${uri}`);
        }
      }

      // walk child nodes
      if (isObject) {
        // iterate through children
        const keys = Object.keys(node);
        for (const key of keys) {
          walk(node[key], meta, key);
        }

        // done, return
        return;

      } else {
        // iterate through children
        for (let i = 0, l = node.length; i < l; i++) {
          walk(node[i], meta, i);
        }

        // done, return
        return;
      }

    })(schema, gctx, 'sctx');

    // dereference refs
    for (let i = 0, l = gctx.refs.length; i < l; i++) {
      const ref = gctx.refs[i];

      if (gctx.uris.has(ref.uri)) {
        ref.parent[ref.key] = gctx.uris.get(ref.uri);

      } else {
        throw new Error(`Unknown URI reference ${ref.uri}`);
      }
    }

    // walk through schema and compile subschemas
    (function metaWalk(meta) {
      for (let keyword of keywords) {
        if (keyword.name in meta.schema) {
          
        }
      }

      // skip primitives
      if (typeof node !== 'object' || node === null) {
        return;
      }

      // set is object flag
      const isObject = !Array.isArray(node);

      // handle $ref
      if (isObject && node.$ref) {
        gctx.refs.push({
          uri: node.$ref,
          parent: metaParent,
          key: metaKey
        });

        // skip other children
        return;
      }

      // create meta
      const meta = metaParent[metaKey] = isObject ? {} : [];

      // define meta properties
      meta.parent = metaParent;
      meta.key = metaKey;
      meta.node = node;
      meta.paths = getPaths(metaParent.paths, metaKey, node.$id);
      meta.GET_VALIDATORS_FOR_TYPE = {
        null: [],
        number: [],
        integer: [],
        string: [],
        array: [],
        object: []
      };
      meta.GET_LOOP_VALIDATORS_FOR_TYPE = {
        array: [],
        object: []
      };

      // set path references
      for (let i = 0, l = meta.paths.length; i < l; i++) {
        const uri = meta.paths[i];

        // check for duplicate uris before setting reference
        if (!gctx.uris.has(uri)) {
          gctx.uris.set(uri, meta);

        } else {
          throw new Error(`Duplicate URI ${uri}`);
        }
      }

      // walk child nodes
      if (isObject) {
        let hasKeywords = false;
        meta.GET_VALIDATORS_FOR_TYPE = {
          null: [],
          number: [],
          integer: [],
          string: [],
          array: [],
          object: []
        };
        meta.GET_LOOP_VALIDATORS_FOR_TYPE = {
          array: [],
          object: []
        };

        // iterate through children
        const keys = Object.keys(node);
        for (const key of keys) {
          walk(node[key], meta, key);

          // compile keywords
          if (key in keywords) {
            hasKeywords = true;
            keywords[key].compile(node);
          }
        }

        if (!hasKeywords) {

        }

        // done, return
        return;

      } else {
        // iterate through children
        for (let i = 0, l = node.length; i < l; i++) {
          walk(node[i], meta, i);
        }

        // done, return
        return;
      }

    })(schema, gctx, 'sctx');
  }
};
