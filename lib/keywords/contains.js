module.exports = {
  name: 'contains',
  compile(rctx, sctx, schema) {
    // compile subschema
    this.compile(rctx, schema, 'contains');

    // push validator
    sctx.GET_VALIDATORS_FOR_TYPE['array']
      .push(validateContains);
  }
};

function validateContains(rctx, sctx, dctx, schema, data) {
  for (const item of data) {
    try {
      this.validate(rctx, schema.contains, item);
      return; // found

    } catch (err) {
      // do nothing
    }
  }

  // not found
  throw 'contains error';
}
