module.exports = {
  name: 'pattern',
  compile(gctx, sctx, schema) {
    // define pattern regex
    sctx.PATTERN_REGEX = schema.pattern instanceof RegExp
      ? schema.pattern : new RegExp(schema.pattern);

    // push validator
    sctx.GET_VALIDATORS_FOR_TYPE['string']
      .push(validatePattern);
  }
};

function validatePattern(gctx, sctx, dctx, schema, data) {
  if (!sctx.PATTERN_REGEX.test(data)) {
    throw 'pattern error';
  }
}
