function compile(ctx, schema, parent) {
  const result = this.compile(ctx, schema, 'contains');

  if (result === false) {
    // use `containsNever`
    return 'containsNever';

  } else if (typeof result === 'object') {
    // use `contains`
    return 'contains';
  }

  // use `containsTrue`
  return 'containsTrue';
}

const validate = {
  containsNever: function () {
    // never succeeds
    throw 'contains never error';
  },

  containsTrue: function (ctx, schema, data) {
    // succeeds if at least one item exists
    if (ctx.dataLength < 1) {
      throw 'contains error';
    }
  },

  contains: function (ctx, schema, data) {
    for (const item of data) {
      try {
        this.validate(schema.contains, item);
        return; // found

      } catch (err) {
        // do nothing
      }
    }

    // not found
    throw 'contains error';
  }
};

module.exports = {
  name: 'contains',
  locations: ['/typeful/array/-'],
  compile,
  validate
};
