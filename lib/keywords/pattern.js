module.exports = {
  name: 'pattern',
  compile(rctx, sctx, schema) {
    // define pattern regex
    sctx.PATTERN_REGEX = schema.pattern instanceof RegExp
      ? schema.pattern : new RegExp(schema.pattern);

    // push validator
    sctx.GET_VALIDATORS_FOR_TYPE['string']
      .push(validatePattern);
  }
};

function validatePattern(rctx, sctx, dctx, schema, data) {
  if (!sctx.PATTERN_REGEX.test(data)) {
    throw 'pattern error';
  }
}
