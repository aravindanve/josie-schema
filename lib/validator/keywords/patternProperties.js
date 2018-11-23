function compile(path, schema) {
  // TODO: handle empty pattern properties object
  if (typeof schema.patternProperties === 'object') {
    // pre-compile array of regexp objects for matching
    schema._regexPatternProperties = [];

    // compile subschemas
    for (const pattern of Object.keys(schema.patternProperties)) {
      // add segment to path and compile subschema
      this.compile(`${path}/patternProperties/${pattern}`,
        schema.patternProperties[pattern]);

      // push regexp object
      schema._regexPatternProperties.push(RegExp(pattern, 'g'));
    }

    // use `patternProperties`
    return 'patternProperties';
  }

  // skip validation
  return false;
}

const validate = {
  properties: function (ctx, schema, data, property) {
    // loop through pre-compiled regex patterns
    for (const pattern of schema._regexPatternProperties) {
      // check pattern against property
      if (property.match(pattern)) {
        // set additional flag to false
        ctx.additional = false;

        // validate data against pattern property schema
        this.validate(schema.patternProperties[pattern.source], data);
      }
    }
  }
};

module.exports = {
  name: 'patternProperties',
  locations: ['/childInstance/object'],
  compile,
  validate
};
