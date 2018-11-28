const objectUtil = require('../../utils/object');

function compile(ctx, schema, parent) {
  // HACK: set metadata for `patternProperties`
  objectUtil.definePropertiesSimpile(schema.patternProperties, {
    _parent: schema,
    _key: 'patternProperties',
    _path: `${schema._path}/patternProperties`
  });

  // pre-compile array of regexp objects for matching
  objectUtil.definePropertiesSimpile(schema, {
    _regexPatternProperties: []
  });

  // HACK: add path reference to context
  ctx.paths[schema.patternProperties._path] = schema.patternProperties;

  // compile subschemas
  for (const pattern of Object.keys(schema.patternProperties)) {
    // add segment to path and compile subschema
    this.compile(ctx, schema.patternProperties, pattern);

    // push regexp object
    schema._regexPatternProperties.push(RegExp(pattern));
  }

  // use `patternProperties`
  return 'patternProperties';
}

const validate = {
  patternProperties: function (ctx, schema, data, property) {
    // loop through pre-compiled regex patterns
    for (const pattern of schema._regexPatternProperties) {
      // check pattern against property
      if (pattern.test(property)) {
        // set additional flag to false
        ctx.additional = false;
        this.validate(schema.patternProperties[pattern.source], data);
      }
    }
  }
};

module.exports = {
  name: 'patternProperties',
  locations: ['/childInstance/object/-'],
  compile,
  validate
};
