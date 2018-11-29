const context = require('./context');
const keywords = require('./keywords');

const self = module.exports = {
  compile(sctx, parent, key) {
    // get fragment
    const fragment = parent[key];

    // skip boolean fragments
    if (typeof fragment === 'boolean') {
      return;
    }

    // create fragment context
    const fctx = context.createFragmentContext(sctx, fragment, {
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
      if (!(keyword.name in fragment)) continue;

      // compile keyword
      keyword.compile.call(self, sctx, fctx, fragment);
    }
  }
};
