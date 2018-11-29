module.exports = {
  name: 'maxLength',
  compile(rctx, sctx, schema) {
    // push validator
    sctx.GET_VALIDATORS_FOR_TYPE['string']
      .push(validateMaxLength);
  }
};

function validateMaxLength(rctx, sctx, dctx, schema, data) {
  if (dctx.DATA_LENGTH > schema.maxLength) {
    throw 'max length error';
  }
}
