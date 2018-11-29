module.exports = {
  name: 'minLength',
  compile(rctx, sctx, schema) {
    // push validator
    sctx.GET_VALIDATORS_FOR_TYPE['string']
      .push(validateMinLength);
  }
};

function validateMinLength(rctx, sctx, dctx, schema, data) {
  if (dctx.DATA_LENGTH < schema.minLength) {
    throw 'min length error';
  }
}
