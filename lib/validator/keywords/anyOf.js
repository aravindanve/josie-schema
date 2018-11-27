const objectUtil = require('../../utils/object');

function compile(ctx, schema, parent) {
  if (!schema.anyOf.length) {
    // use `anyOfNever`
    return 'anyOfNever';
  }

  // HACK: set metadata for `anyOf`
  objectUtil.definePropertiesSimpile(schema.anyOf, {
    _parent: schema,
    _key: 'anyOf',
    _path: `${schema._path}/anyOf`
  });

  // HACK: add path reference to context
  ctx.paths[schema.anyOf._path] = schema.anyOf;

  // compile subschemas
  const _anyOf = [];
  for (let i = 0; i < schema.anyOf.length; i++) {
    const result = this.compile(ctx, schema.anyOf, i);

    if (result === true) {
      // skip validation
      return false;

    } else if (typeof result === 'object') {
      _anyOf.push(result);
    }
  }

  if (!_anyOf.length) {
    // use `anyOfNever`
    return 'anyOfNever';
  }

  objectUtil.definePropertiesSimpile(schema, {
    _anyOf
  });

  // use `anyOf`
  return 'anyOf';
}

const validate = {
  anyOfNever: function () {
    // never succeeds
    throw 'any of never error';
  },

  anyOf: function (ctx, schema, data) {
    // loop through pre compiled any of subschemas
    for (let i = 0; i < schema._anyOf.length; i++) {
      try {
        this.validate(schema._anyOf[i], data);
        return; // found

      } catch (err) {
        // do nothing
      }
    }

    // not found
    throw 'any of error';
  }
};

module.exports = {
  name: 'anyOf',
  locations: ['/typeless/-'],
  compile,
  validate
};
