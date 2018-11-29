const self = module.exports = {
  createGlobalContext() {
    return {
      sctxMap: new WeakMap(),
      uriMap: new Map(),
      refs: []
    };
  },

  create(gctx, schema, sctx) {
    gctx.sctxMap.set(schema, sctx);

    return sctx;
  },

  get(gctx, schema) {
    return gctx.sctxMap.get(schema);
  }
};
