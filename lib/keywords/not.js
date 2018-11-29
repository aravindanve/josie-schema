module.exports = {
  name: 'not',
  compile(rctx, sctx, schema) {
    // compile subschema
    this.compile(rctx, schema, 'not');

    // push validator
    sctx.GET_VALIDATORS_FOR_TYPE['null']
      .push(validateNot);
    sctx.GET_VALIDATORS_FOR_TYPE['boolean']
      .push(validateNot);
    sctx.GET_VALIDATORS_FOR_TYPE['number']
      .push(validateNot);
    sctx.GET_VALIDATORS_FOR_TYPE['integer']
      .push(validateNot);
    sctx.GET_VALIDATORS_FOR_TYPE['string']
      .push(validateNot);
    sctx.GET_VALIDATORS_FOR_TYPE['array']
      .push(validateNot);
    sctx.GET_VALIDATORS_FOR_TYPE['object']
      .push(validateNot);
  }
};

function validateNot(rctx, sctx, dctx, schema, data) {
  try {
    this.validate(rctx, schema.not, data);

  } catch (err) {
    // not a match, succeed
    return;
  }

  // matched, fail
  throw 'not error';
}
