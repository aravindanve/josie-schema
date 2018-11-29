module.exports = {
  name: 'exclusiveMaximum',
  compile(gctx, sctx, schema) {
    // push validator
    sctx.GET_VALIDATORS_FOR_TYPE['number']
      .push(validateExclusiveMaximum);
    sctx.GET_VALIDATORS_FOR_TYPE['integer']
      .push(validateExclusiveMaximum);
  }
};

function validateExclusiveMaximum(gctx, sctx, dctx, schema, data) {
  if (data >= schema.exclusiveMaximum) {
    throw 'exclusive maximum error';
  }
}
