const objectUtil = require('../../utils/object');

function compile(ctx, schema, parent) {
  if (schema.allOf.length) {
    // HACK: set metadata for `allOf`
    objectUtil.definePropertiesSimpile(schema.allOf, {
      _parent: schema,
      _key: 'allOf',
      _path: `${schema._path}/allOf`
    });

    // HACK: add path reference to context
    ctx.paths[schema.allOf._path] = schema.allOf;

    // compile subschemas
    const _allOf = [];
    for (let i = 0; i < schema.allOf.length; i++) {
      const result = this.compile(ctx, schema.allOf, i);

      if (result === false) {
        // use `allOfNever`
        return 'allOfNever';

      } else if (typeof result === 'object') {
        _allOf.push(result);
      }
    }

    if (_allOf.length) {
      objectUtil.definePropertiesSimpile(schema, {
        _allOf
      });

      // use `allOf`
      return 'allOf';
    }
  }

  // skip validation
  return false;
}

const validate = {
  allOfNever: function () {
    // never succeeds
    throw 'all of never error';
  },

  allOf: function (ctx, schema, data) {
    // loop through pre compiled all of subschemas
    for (let i = 0; i < schema._allOf.length; i++) {
      this.validate(schema._allOf[i], data);
    }
  }
};

module.exports = {
  name: 'allOf',
  locations: ['/typeless/-'],
  compile,
  validate
};
