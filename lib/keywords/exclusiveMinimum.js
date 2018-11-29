module.exports = {
  name: 'exclusiveMinimum',
  compile(rctx, sctx, schema) {
    // push validator
    sctx.GET_VALIDATORS_FOR_TYPE['number']
      .push(validateExclusiveMinimum);
    sctx.GET_VALIDATORS_FOR_TYPE['integer']
      .push(validateExclusiveMinimum);
  }
};

function validateExclusiveMinimum(rctx, sctx, dctx, schema, data) {
  if (data <= schema.exclusiveMinimum) {
    throw 'exclusive minimum error';
  }
}
