module.exports = {
  name: 'minLength',
  compile(sctx, fctx, fragment) {
    // push validator
    fctx.GET_VALIDATORS_FOR_TYPE['string']
      .push(validateMinLength);
  }
};

function validateMinLength(sctx, fctx, dctx, fragment, data) {
  if (dctx.DATA_LENGTH < fragment.minLength) {
    throw 'min length error';
  }
}
