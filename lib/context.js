const self = module.exports = {
  // global context vars
  ROOT_CONTEXT_MAP: new WeakMap(),
  // URI_SCHEMA_MAP: new Map(),

  createRootContext(root) {
    const rctx = {
      SCHEMA_CONTEXT_MAP: new WeakMap(),
      // FRAGMENT_CONTEXT_MAP: new WeakMap(),
      // URI_SCHEMA_MAP: new Map(),
      POINTER_SCHEMA_MAP: new Map()
    };

    // set context to root context map
    this.ROOT_CONTEXT_MAP.set(root, rctx);

    // return context
    return rctx;
  },

  getRootContext(root) {
    // get context from root context map
    return this.ROOT_CONTEXT_MAP.get(root);
  },

  // clearRootContext(root) {
  //   // get context from root context map
  //   const rctx = this.ROOT_CONTEXT_MAP.get(root);

  //   // return if context not found
  //   if (!rctx) return;

  //   // iterate through uris
  //   for (const uri of rctx.URI_SCHEMA_MAP.keys()) {
  //     // delete uri from global uri schema map
  //     this.URI_SCHEMA_MAP.delete(uri);
  //   }

  //   // clear root uri schema map
  //   rctx.URI_SCHEMA_MAP.clear();

  //   // clear root context
  //   this.ROOT_CONTEXT_MAP.delete(root);
  // },

  createSchemaContext(rctx, schema, sctx) {
    // set context
    rctx.SCHEMA_CONTEXT_MAP.set(schema, sctx);

    // return context
    return sctx;
  },

  hasSchemaContext(rctx, schema) {
    return rctx.SCHEMA_CONTEXT_MAP.has(schema);
  },

  getSchemaContext(rctx, schema) {
    // get context from schema context map
    return rctx.SCHEMA_CONTEXT_MAP.get(schema);
  },

  // createFragmentContext(rctx, fragment, fctx) {
  //   // set context
  //   rctx.FRAGMENT_CONTEXT_MAP.set(fragment, fctx);

  //   // return context
  //   return fctx;
  // },

  // getFragmentContext(rctx, fragment) {
  //   // get context from frgament context map
  //   return rctx.FRAGMENT_CONTEXT_MAP.get(fragment);
  // },

  // addFragment(rctx, { parent, key, node, id }) {
  //   let parentPaths = [];

  //   if (parent && key) {
  //     // schema node
  //     const pfctx = rctx.FRAGMENT_CONTEXT_MAP.get(parent);

  //     if (!pfctx) {
  //       throw new Error(`Unknown parent for node at '${key}'`);
  //     }

  //   }

  //   // get paths for fragment
  //   const paths = getPathsForFragment(pfctx.PATHS, key, id);

  //   // iterate through paths
  //   for (let i = 0, l = paths.length; i < l; i++) {
  //     const path = paths[i];

  //     // check if pointer or uri
  //     if (/^\//.test(path)) {
  //       if (rctx.POINTER_SCHEMA_MAP.has(path)) {
  //         throw new Error(`Dupliacte pointer reference ${ref.uri}`);
  //       }

  //     } else {

  //     }
  //   }
  //   return this.createFragmentContext(rctx, node, {
  //     URIS: uris,
  //     KEY: key,
  //     ID: id
  //   });

  //   // NOTE: parents must be registered before children
  //   // for fragment context to be available with uris etc.
  //   // one of the parents path could be:
  //   // http://example.com/root.json#/definitions/B
  //   // and if $id = other.json,
  //   // one of the resulting paths, amongst others, must be
  //   // http://example.com/other.json

  //   // also: validate duplicate uris
  //   // also: do not set pure json pointers to global (without base id)
  // },

  // getSchema(rctx, uri) {
  //   // TODO: what about reffed boolean schemas?
  //   if (rctx.URI_SCHEMA_MAP.has(uri)) {
  //     return rctx.URI_SCHEMA_MAP.get(uri);

  //   } else if (this.URI_SCHEMA_MAP.has(uri)) {
  //     return this.URI_SCHEMA_MAP.get(uri);

  //   } else {
  //     throw new Error(`Unknown URI reference ${ref.uri}`);
  //   }
  // }
};
