const stringify = require('../../utils/stringify');

module.exports = {
  name: 'enum',
  compile(gctx, sctx, schema) {
    // set define data string
    sctx.DEFINE_DATA_STRING = true;

    // define enum map
    sctx.ENUM_MAP = new Map();
    for (let i = 0, l = schema.enum.length; i < l; i++) {
      sctx.ENUM_MAP.set(stringify(schema.enum[i]), true);
    }

    // push validator
    sctx.GET_VALIDATORS_FOR_TYPE['null']
      .push(validateEnumMap);
    sctx.GET_VALIDATORS_FOR_TYPE['boolean']
      .push(validateEnumMap);
    sctx.GET_VALIDATORS_FOR_TYPE['number']
      .push(validateEnumMap);
    sctx.GET_VALIDATORS_FOR_TYPE['integer']
      .push(validateEnumMap);
    sctx.GET_VALIDATORS_FOR_TYPE['string']
      .push(validateEnumMap);
    sctx.GET_VALIDATORS_FOR_TYPE['array']
      .push(validateEnumMap);
    sctx.GET_VALIDATORS_FOR_TYPE['object']
      .push(validateEnumMap);
  }
};

function validateEnumMap(gctx, sctx, dctx, schema, data) {
  if (!sctx.ENUM_MAP.has(dctx.DATA_STRING)) {
    throw 'enum map error';
  }
}
