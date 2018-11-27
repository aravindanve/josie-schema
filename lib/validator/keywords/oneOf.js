const objectUtil = require('../../utils/object');

function compile(ctx, schema, parent) {
  // OPTIMIZE: for two or more true schemas

  if (!schema.oneOf.length) {
    // use `oneOfNever`
    return 'oneOfNever';
  }

  // HACK: set metadata for `oneOf`
  objectUtil.definePropertiesSimpile(schema.oneOf, {
    _parent: schema,
    _key: 'oneOf',
    _path: `${schema._path}/oneOf`
  });

  // HACK: add path reference to context
  ctx.paths[schema.oneOf._path] = schema.oneOf;

  // compile subschemas
  for (let i = 0; i < schema.oneOf.length; i++) {
    this.compile(ctx, schema.oneOf, i);
  }

  // use `oneOf`
  return 'oneOf';
}

const validate = {
  oneOfNever: function () {
    // never succeeds
    throw 'one of never error';
  },

  oneOf: function (ctx, schema, data) {
    let matched = 0;
    loop:
    for (let i = 0; i < schema.oneOf.length; i++) {
      try {
        this.validate(schema.oneOf[i], data);

      } catch (err) {
        continue loop;
      }

      if (++matched > 1) {
        throw 'one of error';
      }
    }
    if (matched !== 1) {
      throw 'one of error';
    }
  }
};

module.exports = {
  name: 'oneOf',
  locations: ['/typeless/-'],
  compile,
  validate
};
