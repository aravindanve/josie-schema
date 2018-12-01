const context = require('./context');
const keywords = require('./keywords');

const self = module.exports = {
  compile(rctx, parent, key) {
    const schema = parent[key];

    // skip boolean schemas
    if (typeof schema === 'boolean') {
      return;
    }

    // skip compiled schemas
    if (context.hasSchemaContext(rctx, schema)) {
      return;
    }

    // set base id
    const baseId = schema.$id
      ? resolve(parent.baseId, schema.$id)
      : parent.baseId;

    // deref schema
    if (schema.$ref) {
      const ref = resolve(baseId, schema.$ref);
      parent[key] = getSchemaByRef()
    }

    // create schema context
    const sctx = context.createSchemaContext(rctx, schema, {
      DEFINE_DATA_STRING: false,
      DEFINE_DATA_ITEM_STRING_MAP: false,
      GET_VALIDATORS_FOR_TYPE: {
        null: [],
        boolean: [],
        number: [],
        integer: [],
        string: [],
        array: [],
        object: []
      },
      GET_LOOP_VALIDATORS_FOR_TYPE: {
        array: [],
        object: []
      },
    });

    // compile keywords
    for (const keyword of keywords) {
      if (!(keyword.name in schema)) continue;

      // compile keyword
      keyword.compile.call(self, rctx, sctx, schema);
    }
  }
};
