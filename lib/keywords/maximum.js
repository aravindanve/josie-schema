module.exports = {
  name: 'maximum',
  compile(sctx, fctx, fragment) {
    // push validator
    fctx.GET_VALIDATORS_FOR_TYPE['number']
      .push(validateMaximum);
    fctx.GET_VALIDATORS_FOR_TYPE['integer']
      .push(validateMaximum);
  }
};

function validateMaximum(sctx, fctx, dctx, fragment, data) {
  if (data > fragment.maximum) {
    throw 'maximum error';
  }
}
