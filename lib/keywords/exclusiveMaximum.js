module.exports = {
  name: 'exclusiveMaximum',
  compile(rctx, sctx, schema) {
    // push validator
    sctx.GET_VALIDATORS_FOR_TYPE['number']
      .push(validateExclusiveMaximum);
    sctx.GET_VALIDATORS_FOR_TYPE['integer']
      .push(validateExclusiveMaximum);
  }
};

function validateExclusiveMaximum(rctx, sctx, dctx, schema, data) {
  if (data >= schema.exclusiveMaximum) {
    throw 'exclusive maximum error';
  }
}
