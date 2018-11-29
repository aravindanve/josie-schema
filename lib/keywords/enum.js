const stringify = require('../utils/stringify');

module.exports = {
  name: 'enum',
  compile(sctx, fctx, fragment) {
    // set define data string
    fctx.DEFINE_DATA_STRING = true;

    // define enum map
    fctx.ENUM_STRING_MAP = new Map();

    // set enum strings
    for (let i = 0, l = fragment.enum.length; i < l; i++) {
      fctx.ENUM_STRING_MAP.set(stringify(fragment.enum[i]), true);
    }

    // push validator
    fctx.GET_VALIDATORS_FOR_TYPE['null']
      .push(validateEnumMap);
    fctx.GET_VALIDATORS_FOR_TYPE['boolean']
      .push(validateEnumMap);
    fctx.GET_VALIDATORS_FOR_TYPE['number']
      .push(validateEnumMap);
    fctx.GET_VALIDATORS_FOR_TYPE['integer']
      .push(validateEnumMap);
    fctx.GET_VALIDATORS_FOR_TYPE['string']
      .push(validateEnumMap);
    fctx.GET_VALIDATORS_FOR_TYPE['array']
      .push(validateEnumMap);
    fctx.GET_VALIDATORS_FOR_TYPE['object']
      .push(validateEnumMap);
  }
};

function validateEnumMap(sctx, fctx, dctx, fragment, data) {
  if (!fctx.ENUM_STRING_MAP.has(dctx.DATA_STRING)) {
    throw 'enum map error';
  }
}
