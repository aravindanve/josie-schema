const self = module.exports = {
  // global context vars
  ROOT_CONTEXT_MAP: new WeakMap(),
  URI_ROOT_MAP: new Map(),

  createRootContext(root, rctx) {
    const ctx = {
      SCHEMA_CONTEXT_MAP: new WeakMap(),
      URI_SCHEMA_MAP: new Map(),
      ...rctx
    };

    this.ROOT_CONTEXT_MAP.set(root, ctx);

    return ctx;
  },

  getRootContext(root) {
    return this.ROOT_CONTEXT_MAP.get(root);
  },

  createSchemaContext(rctx, schema, sctx) {
    rctx.SCHEMA_CONTEXT_MAP.set(schema, sctx);

    return sctx;
  },

  getSchemaContext(rctx, schema) {
    return rctx.SCHEMA_CONTEXT_MAP.get(schema);
  },

  addUriSchema() {

  },

  removeUriSchema() {

  }

  // addRef(rctx, parent, key, ref) {
  //   const ref = { parent, key, ref };

  //   rctx.REFS.push(ref);

  //   return ref;
  // },

  // addUri(rctx, uri, node) {
  //   if (rctx.URI_MAP.has(uri)) {
  //     throw new Error(`Duplicate URI ${uri}`);
  //   }

  //   rctx.URI_MAP.set(uri, node);

  //   return node;
  // }
};
