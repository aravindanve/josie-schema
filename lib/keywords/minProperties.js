module.exports = {
  name: 'minProperties',
  compile(rctx, sctx, schema) {
    // push validator
    sctx.GET_VALIDATORS_FOR_TYPE['object']
      .push(validateMinProperties);
  }
};

function validateMinProperties(rctx, sctx, dctx, schema, data) {
  if (dctx.DATA_LENGTH < schema.minProperties) {
    throw 'min properties error';
  }
}
