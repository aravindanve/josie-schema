module.exports = {
  name: 'not',
  compile(sctx, fctx, fragment) {
    // compile subfragment
    this.compile(sctx, fragment, 'not');

    // push validator
    fctx.GET_VALIDATORS_FOR_TYPE['null']
      .push(validateNot);
    fctx.GET_VALIDATORS_FOR_TYPE['boolean']
      .push(validateNot);
    fctx.GET_VALIDATORS_FOR_TYPE['number']
      .push(validateNot);
    fctx.GET_VALIDATORS_FOR_TYPE['integer']
      .push(validateNot);
    fctx.GET_VALIDATORS_FOR_TYPE['string']
      .push(validateNot);
    fctx.GET_VALIDATORS_FOR_TYPE['array']
      .push(validateNot);
    fctx.GET_VALIDATORS_FOR_TYPE['object']
      .push(validateNot);
  }
};

function validateNot(sctx, fctx, dctx, fragment, data) {
  try {
    this.validate(sctx, fragment.not, data);

  } catch (err) {
    // not a match, succeed
    return;
  }

  // matched, fail
  throw 'not error';
}
