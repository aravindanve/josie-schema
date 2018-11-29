module.exports = {
  name: 'maxProperties',
  compile(sctx, fctx, fragment) {
    // push validator
    fctx.GET_VALIDATORS_FOR_TYPE['object']
      .push(validateMaxProperties);
  }
};

function validateMaxProperties(sctx, fctx, dctx, fragment, data) {
  if (dctx.DATA_LENGTH > fragment.maxProperties) {
    throw 'max properties error';
  }
}
