module.exports = {
  name: 'patternProperties',
  compile(sctx, fctx, fragment) {
    // define property pattern regexes
    fctx.PROPERTY_PATTERN_REGEXES = [];

    // compile subfragments
    const patternProperties = Object.keys(fragment.patternProperties);
    for (const pattern of patternProperties) {
      this.compile(sctx, fragment.patternProperties, pattern);

      // push pattern
      fctx.PROPERTY_PATTERN_REGEXES.push(new RegExp(pattern));
    }

    // push validator
    fctx.GET_LOOP_VALIDATORS_FOR_TYPE['object']
      .push(validatePatternProperty);
  }
};

function validatePatternProperty(sctx, fctx, dctx, fragment, data, property) {
  // loop through property pattern regexes
  for (const pattern of fctx.PROPERTY_PATTERN_REGEXES) {
    // check pattern against property
    if (pattern.test(property)) {
      dctx.IS_ADDITIONAL = false;
      this.validate(
        sctx,
        fragment.patternProperties[pattern.source],
        data[property]);
    }
  }
}
