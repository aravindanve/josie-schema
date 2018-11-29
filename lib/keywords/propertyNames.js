module.exports = {
  name: 'propertyNames',
  compile(sctx, fctx, fragment) {
    // compile subfragment
    this.compile(sctx, fragment, 'propertyNames');

    // push validator
    fctx.GET_LOOP_VALIDATORS_FOR_TYPE['object']
      .push(validatePropertyNames);
  }
};

function validatePropertyNames(sctx, fctx, dctx, fragment, data, property) {
  this.validate(sctx, fragment.propertyNames, property);
}
