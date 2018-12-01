const context = require('./context');
const keywords = require('./keywords');

const self = module.exports = {
  deref(rctx, parent, key) {
    const schema = parent[key];

    // skip boolean schemas
    if (typeof schema === 'boolean') {
      return;
    }

    // deref schema
    if (schema.$ref) {
      push({ ref: resolve(baseId, schema.$ref), parent, key });
    }

    

    // // skip dereffed schemas
    // if (context.hasSchemaContext(rctx, schema)) {
    //   return;
    // }

    // // create schema context
    // const sctx = context.createSchemaContext(rctx, schema, {
    //   DEFINE_DATA_STRING: false,
    //   DEFINE_DATA_ITEM_STRING_MAP: false,
    //   GET_VALIDATORS_FOR_TYPE: {
    //     null: [],
    //     boolean: [],
    //     number: [],
    //     integer: [],
    //     string: [],
    //     array: [],
    //     object: []
    //   },
    //   GET_LOOP_VALIDATORS_FOR_TYPE: {
    //     array: [],
    //     object: []
    //   },
    // });

    // deref keywords
    for (const keyword of keywords) {
      if (!(keyword.name in schema)) continue;

      // deref keyword
      keyword.deref.call(self, rctx, sctx, schema);
    }
  }
};
