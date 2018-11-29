module.exports = {
  name: 'contains',
  compile(sctx, fctx, fragment) {
    // compile subfragment
    this.compile(sctx, fragment, 'contains');

    // push validator
    fctx.GET_VALIDATORS_FOR_TYPE['array']
      .push(validateContains);
  }
};

function validateContains(sctx, fctx, dctx, fragment, data) {
  for (const item of data) {
    try {
      this.validate(sctx, fragment.contains, item);
      return; // found

    } catch (err) {
      // do nothing
    }
  }

  // not found
  throw 'contains error';
}
