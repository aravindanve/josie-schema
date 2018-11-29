module.exports = {
  name: 'exclusiveMinimum',
  compile(gctx, sctx, schema) {
    // push validator
    sctx.GET_VALIDATORS_FOR_TYPE['number']
      .push(validateExclusiveMinimum);
    sctx.GET_VALIDATORS_FOR_TYPE['integer']
      .push(validateExclusiveMinimum);
  }
};

function validateExclusiveMinimum(gctx, sctx, dctx, schema, data) {
  if (data <= schema.exclusiveMinimum) {
    throw 'exclusive minimum error';
  }
}
