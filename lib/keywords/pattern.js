module.exports = {
  name: 'pattern',
  compile(sctx, fctx, fragment) {
    // define pattern regex
    fctx.PATTERN_REGEX = fragment.pattern instanceof RegExp
      ? fragment.pattern : new RegExp(fragment.pattern);

    // push validator
    fctx.GET_VALIDATORS_FOR_TYPE['string']
      .push(validatePattern);
  }
};

function validatePattern(sctx, fctx, dctx, fragment, data) {
  if (!fctx.PATTERN_REGEX.test(data)) {
    throw 'pattern error';
  }
}
