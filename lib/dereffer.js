const context = require('./context');
const clone = require('./utils/clone');

function getUris(parentPaths, key, $id) {

  const realFragment = '';
  // parent path could be:
  // http://example.com/root.json#/definitions/B
  // and if $id = other.json,
  // one of the resulting paths, amongst others, must be
  // http://example.com/other.json
}

const self = {
  deref(sctx, schema) {
    // clone schema and detect refs
    // const schemaCopy = clone(schema, () => {
    //   const parentUris = [];
    //   const key = '';
    //   const $id = 'http://example.com/root.json';
    //   const uris = getUris(parentUris, key, $id);

    //   for (let i = 0, l = uris.length; i < l; i++) {
    //     context.addUri(sctx, uris[i], node);
    //   }
    // });

    // dereference refs
    for (let i = 0, l = sctx.REFS.length; i < l; i++) {
      const ref = sctx.REFS[i];

      if (sctx.URI_MAP.has(ref.uri)) {
        ref.parent[ref.key] = sctx.URI_MAP.get(ref.uri);

      } else {
        throw new Error(`Unknown URI reference ${ref.uri}`);
      }
    }

    // clear refs
    sctx.REFS = [];

    return schemaCopy;
  }
};
