const objectUtil = require('../../utils/object');

function compile(ctx, schema, parent) {
  // pre compile regex
  objectUtil.definePropertiesSimpile(schema, {
    _pattern: schema.pattern instanceof RegExp
      ? schema.pattern : new RegExp(schema.pattern)
  });

  // use `pattern`
  return 'pattern';
}

const validate = {
  pattern: function (ctx, schema, data) {
    if (!schema._pattern.test(data)) {
      throw 'pattern error';
    }
  }
};

module.exports = {
  name: 'pattern',
  locations: ['/typeful/string/-'],
  compile,
  validate
};
