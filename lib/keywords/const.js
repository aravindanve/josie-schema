const stringify = require('../utils/stringify');

module.exports = {
  name: 'const',
  compile(sctx, fctx, fragment) {
    // set define data string
    fctx.DEFINE_DATA_STRING = true;

    // define const string
    fctx.CONST_STRING = stringify(fragment.const);

    // push validator
    fctx.GET_VALIDATORS_FOR_TYPE['null']
      .push(validateConst);
    fctx.GET_VALIDATORS_FOR_TYPE['boolean']
      .push(validateConst);
    fctx.GET_VALIDATORS_FOR_TYPE['number']
      .push(validateConst);
    fctx.GET_VALIDATORS_FOR_TYPE['integer']
      .push(validateConst);
    fctx.GET_VALIDATORS_FOR_TYPE['string']
      .push(validateConst);
    fctx.GET_VALIDATORS_FOR_TYPE['array']
      .push(validateConst);
    fctx.GET_VALIDATORS_FOR_TYPE['object']
      .push(validateConst);
  }
};

function validateConst(sctx, fctx, dctx, fragment, data) {
  if (dctx.DATA_STRING !== fctx.CONST_STRING) {
    throw 'const error';
  }
}
