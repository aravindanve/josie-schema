const self = module.exports = {
  // uctx: {
  //   SCHEMA_MAP: new Map(),

  // },

  createGlobalContext() {
    return {
      FCTX_MAP: new WeakMap(),
      URI_MAP: new Map(),
      REFS: []
    };
  },

  createFragmentContext(sctx, fragment, fctx) {
    sctx.FCTX_MAP.set(fragment, fctx);

    return fctx;
  },

  getFragmentContext(sctx, fragment) {
    return sctx.FCTX_MAP.get(fragment);
  },

  // addRef(sctx, parent, key, ref) {
  //   const ref = { parent, key, ref };

  //   sctx.REFS.push(ref);

  //   return ref;
  // },

  // addUri(sctx, uri, node) {
  //   if (sctx.URI_MAP.has(uri)) {
  //     throw new Error(`Duplicate URI ${uri}`);
  //   }

  //   sctx.URI_MAP.set(uri, node);

  //   return node;
  // }
};
