module.exports = {
  name: 'contains',
  compile(gctx, sctx, schema) {
    // compile subschema
    this.compile(gctx, schema, 'contains');

    // push validator
    sctx.GET_VALIDATORS_FOR_TYPE['array']
      .push(validateContains);
  }
};

function validateContains(gctx, sctx, dctx, schema, data) {
  for (const item of data) {
    try {
      this.validate(gctx, schema.contains, item);
      return; // found

    } catch (err) {
      // do nothing
    }
  }

  // not found
  throw 'contains error';
}
