module.exports = {
  name: 'not',
  compile(gctx, sctx, schema) {
    // compile subschema
    this.compile(gctx, schema, 'not');

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

function validateNot(gctx, sctx, dctx, schema, data) {
  try {
    this.validate(gctx, schema.not, data);

  } catch (err) {
    // not a match, succeed
    return;
  }

  // matched, fail
  throw 'not error';
}
