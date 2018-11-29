module.exports = {
  name: 'minimum',
  compile(sctx, fctx, fragment) {
    // push validator
    fctx.GET_VALIDATORS_FOR_TYPE['number']
      .push(validateMinimum);
    fctx.GET_VALIDATORS_FOR_TYPE['integer']
      .push(validateMinimum);
  }
};

function validateMinimum(sctx, fctx, dctx, fragment, data) {
  if (data < fragment.minimum) {
    throw 'minimum error';
  }
}
