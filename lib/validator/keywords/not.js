function compile(ctx, schema, parent) {
  const result = this.compile(ctx, schema, 'not');

  if (result === true) {
    // use `notNever`
    return 'notNever';

  } else if (typeof result === 'object') {
    // use `not`
    return 'not';
  }

  // skip validation
  return false;
}

const validate = {
  notNever: function (ctx) {
    // never succeeds
    throw 'not never error';
  },

  not: function (ctx, schema, data, i) {
    try {
      this.validate(schema.not, data);

    } catch (err) {
      return; // not a match, succeed
    }

    // matched, fail
    throw 'not error';
  }
};

module.exports = {
  name: 'not',
  locations: ['/typeless/-'],
  compile,
  validate
};
