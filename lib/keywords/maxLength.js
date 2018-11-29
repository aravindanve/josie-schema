module.exports = {
  name: 'maxLength',
  compile(sctx, fctx, fragment) {
    // push validator
    fctx.GET_VALIDATORS_FOR_TYPE['string']
      .push(validateMaxLength);
  }
};

function validateMaxLength(sctx, fctx, dctx, fragment, data) {
  if (dctx.DATA_LENGTH > fragment.maxLength) {
    throw 'max length error';
  }
}
