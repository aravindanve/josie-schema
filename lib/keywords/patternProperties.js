module.exports = {
  name: 'patternProperties',
  compile(gctx, sctx, schema) {
    // define property pattern regexes
    sctx.PROPERTY_PATTERN_REGEXES = [];

    // compile subschemas
    const patternProperties = Object.keys(schema.patternProperties);
    for (const pattern of patternProperties) {
      this.compile(gctx, schema.patternProperties, pattern);

      // push pattern
      sctx.PROPERTY_PATTERN_REGEXES.push(new RegExp(pattern));
    }

    // push validator
    sctx.GET_LOOP_VALIDATORS_FOR_TYPE['object']
      .push(validatePatternProperty);
  }
};

function validatePatternProperty(gctx, sctx, dctx, schema, data, property) {
  // loop through property pattern regexes
  for (const pattern of sctx.PROPERTY_PATTERN_REGEXES) {
    // check pattern against property
    if (pattern.test(property)) {
      dctx.IS_ADDITIONAL = false;
      this.validate(
        gctx,
        schema.patternProperties[pattern.source],
        data[property]);
    }
  }
}
