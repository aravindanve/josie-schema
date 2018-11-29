module.exports = {
  name: 'maxProperties',
  compile(rctx, sctx, schema) {
    // push validator
    sctx.GET_VALIDATORS_FOR_TYPE['object']
      .push(validateMaxProperties);
  }
};

function validateMaxProperties(rctx, sctx, dctx, schema, data) {
  if (dctx.DATA_LENGTH > schema.maxProperties) {
    throw 'max properties error';
  }
}
