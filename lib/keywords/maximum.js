module.exports = {
  name: 'maximum',
  compile(gctx, sctx, schema) {
    // push validator
    sctx.GET_VALIDATORS_FOR_TYPE['number']
      .push(validateMaximum);
    sctx.GET_VALIDATORS_FOR_TYPE['integer']
      .push(validateMaximum);
  }
};

function validateMaximum(gctx, sctx, dctx, schema, data) {
  if (data > schema.maximum) {
    throw 'maximum error';
  }
}
