module.exports = {
  name: 'allOf',
  compile(rctx, sctx, schema) {
    // compile subschemas
    for (let i = 0, l = schema.allOf.length; i < l; i++) {
      this.compile(rctx, schema.allOf, i);
    }

    // push validator
    sctx.GET_VALIDATORS_FOR_TYPE['null']
      .push(validateAllOf);
    sctx.GET_VALIDATORS_FOR_TYPE['boolean']
      .push(validateAllOf);
    sctx.GET_VALIDATORS_FOR_TYPE['number']
      .push(validateAllOf);
    sctx.GET_VALIDATORS_FOR_TYPE['integer']
      .push(validateAllOf);
    sctx.GET_VALIDATORS_FOR_TYPE['string']
      .push(validateAllOf);
    sctx.GET_VALIDATORS_FOR_TYPE['array']
      .push(validateAllOf);
    sctx.GET_VALIDATORS_FOR_TYPE['object']
      .push(validateAllOf);
  }
};

function validateAllOf(rctx, sctx, dctx, schema, data) {
  for (let i = 0, l = schema.allOf.length; i < l; i++) {
    this.validate(rctx, schema.allOf[i], data);
  }
}
