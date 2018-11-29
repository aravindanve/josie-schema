module.exports = {
  name: 'minimum',
  compile(rctx, sctx, schema) {
    // push validator
    sctx.GET_VALIDATORS_FOR_TYPE['number']
      .push(validateMinimum);
    sctx.GET_VALIDATORS_FOR_TYPE['integer']
      .push(validateMinimum);
  }
};

function validateMinimum(rctx, sctx, dctx, schema, data) {
  if (data < schema.minimum) {
    throw 'minimum error';
  }
}
