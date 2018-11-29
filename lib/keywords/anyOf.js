module.exports = {
  name: 'anyOf',
  compile(gctx, sctx, schema) {
    // compile subschemas
    for (let i = 0, l = schema.anyOf.length; i < l; i++) {
      this.compile(gctx, schema.anyOf, i);
    }

    // push validator
    sctx.GET_VALIDATORS_FOR_TYPE['null']
      .push(validateAnyOf);
    sctx.GET_VALIDATORS_FOR_TYPE['boolean']
      .push(validateAnyOf);
    sctx.GET_VALIDATORS_FOR_TYPE['number']
      .push(validateAnyOf);
    sctx.GET_VALIDATORS_FOR_TYPE['integer']
      .push(validateAnyOf);
    sctx.GET_VALIDATORS_FOR_TYPE['string']
      .push(validateAnyOf);
    sctx.GET_VALIDATORS_FOR_TYPE['array']
      .push(validateAnyOf);
    sctx.GET_VALIDATORS_FOR_TYPE['object']
      .push(validateAnyOf);
  }
};

function validateAnyOf(gctx, sctx, dctx, schema, data) {
  for (let i = 0, l = schema.anyOf.length; i < l; i++) {
    try {
      this.validate(gctx, schema.anyOf[i], data);

      // one match, return
      return;

    } catch (err) {}
  }

  // none matched
  throw 'any of error';
}
