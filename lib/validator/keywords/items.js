function compile(path, schema) {
  // TODO: handle empty items schema or array
  // TODO: handle empty additional items schema
  if (schema.items === false) {
    // use `itemsNever`
    return 'itemsNever';

  } else if (Array.isArray(schema.items)) {
    // compile subschemas
    for (let i = 0; i < schema.items.length; i++) {
      // add segment to path and compile subschema
      this.compile(`${path}/items/${i}`, schema.items[i]);
    }

    // handle `additionalItems`
    if (schema.additionalItems === false) {
      // use `itemsArrayAdditionalNever`
      return 'itemsArrayAdditionalNever';

    } else if (typeof schema.additionalItems === 'object') {
      // add segment to path and compile subschema
      this.compile(`${path}/additionalItems`, schema.additionalItems);

      // use `itemsArrayAdditionalObject`
      return 'itemsArrayAdditionalObject';

    } else {
      // use `itemsArrayAdditionalAlways`
      return 'itemsArrayAdditionalAlways';
    }

  } else if (typeof schema.items === 'object') {
    // add segment to path and compile subschema
    this.compile(`${path}/items`, schema.items);

    // use `itemsObject`
    return 'itemsObject';
  }

  // skip validation
  return false;
}

const validate = {
  itemsNever: function () {
    // never succeeds
    throw 'items never error';
  },

  itemsObject: function (ctx, schema, data, i) {
    // validate against items schema
    this.validate(schema.items, data);
  },

  itemsArrayAdditionalAlways: function (ctx, schema, data, i) {
    // validate if within items length
    if (i < schema.items.length) {
      this.validate(schema.items[i], data);
    }
  },

  itemsArrayAdditionalNever: function (ctx, schema, data, i) {
    if (i < schema.items.length) {
      // validate against items schema
      this.validate(schema.items[i], data);

    } else {
      // never succeeds
      throw 'additional items error';
    }
  },

  itemsArrayAdditionalObject: function (ctx, schema, data, i) {
    if (i < schema.items.length) {
      // validate against items schema
      this.validate(schema.items[i], data);

    } else {
      // validate against additional items schema
      this.validate(schema.additionalItems, data);
    }
  }
};

module.exports = {
  name: 'items',
  locations: ['/childInstance/array'],
  compile,
  validate
};
