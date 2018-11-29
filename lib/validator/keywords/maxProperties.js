module.exports = {
  name: 'maxProperties',
  compile(gctx, sctx, schema) {
    // push validator
    sctx.GET_VALIDATORS_FOR_TYPE['object']
      .push(validateMaxProperties);
  }
};

function validateMaxProperties(gctx, sctx, dctx, schema, data) {
  if (dctx.DATA_LENGTH > schema.maxProperties) {
    throw 'max properties error';
  }
}
