module.exports = {
  name: 'maxLength',
  compile(gctx, sctx, schema) {
    // push validator
    sctx.GET_VALIDATORS_FOR_TYPE['string']
      .push(validateMaxLength);
  }
};

function validateMaxLength(gctx, sctx, dctx, schema, data) {
  if (dctx.DATA_LENGTH > schema.maxLength) {
    throw 'max length error';
  }
}
