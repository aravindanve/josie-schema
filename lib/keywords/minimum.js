module.exports = {
  name: 'minimum',
  compile(gctx, sctx, schema) {
    // push validator
    sctx.GET_VALIDATORS_FOR_TYPE['number']
      .push(validateMinimum);
    sctx.GET_VALIDATORS_FOR_TYPE['integer']
      .push(validateMinimum);
  }
};

function validateMinimum(gctx, sctx, dctx, schema, data) {
  if (data < schema.minimum) {
    throw 'minimum error';
  }
}
