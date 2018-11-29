module.exports = {
  name: 'minLength',
  compile(gctx, sctx, schema) {
    // push validator
    sctx.GET_VALIDATORS_FOR_TYPE['string']
      .push(validateMinLength);
  }
};

function validateMinLength(gctx, sctx, dctx, schema, data) {
  if (dctx.DATA_LENGTH < schema.minLength) {
    throw 'min length error';
  }
}
