module.exports = {
  name: 'minProperties',
  compile(sctx, fctx, fragment) {
    // push validator
    fctx.GET_VALIDATORS_FOR_TYPE['object']
      .push(validateMinProperties);
  }
};

function validateMinProperties(sctx, fctx, dctx, fragment, data) {
  if (dctx.DATA_LENGTH < fragment.minProperties) {
    throw 'min properties error';
  }
}
