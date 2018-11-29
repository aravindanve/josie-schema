const stringify = require('../utils/stringify');

module.exports = {
  name: 'const',
  compile(rctx, sctx, schema) {
    // set define data string
    sctx.DEFINE_DATA_STRING = true;

    // define const string
    sctx.CONST_STRING = stringify(schema.const);

    // push validator
    sctx.GET_VALIDATORS_FOR_TYPE['null']
      .push(validateConst);
    sctx.GET_VALIDATORS_FOR_TYPE['boolean']
      .push(validateConst);
    sctx.GET_VALIDATORS_FOR_TYPE['number']
      .push(validateConst);
    sctx.GET_VALIDATORS_FOR_TYPE['integer']
      .push(validateConst);
    sctx.GET_VALIDATORS_FOR_TYPE['string']
      .push(validateConst);
    sctx.GET_VALIDATORS_FOR_TYPE['array']
      .push(validateConst);
    sctx.GET_VALIDATORS_FOR_TYPE['object']
      .push(validateConst);
  }
};

function validateConst(rctx, sctx, dctx, schema, data) {
  if (dctx.DATA_STRING !== sctx.CONST_STRING) {
    throw 'const error';
  }
}
