module.exports = {
  name: 'items',
  compile(rctx, sctx, schema) {
    let validator;

    // check if items is an array
    if (Array.isArray(schema.items)) {
      // define items length
      sctx.ITEMS_LENGTH = schema.items.length;

      // compile subschemas
      for (let i = 0, l = schema.items.length; i < l; i++) {
        this.compile(rctx, schema.items, i);
      }

      // handle `additionalItems`
      if ('additionalItems' in schema) {
        // compile subschema
        this.compile(rctx, schema, 'additionalItems');

        // select item or additional item validator
        validator = validateItemOrAdditionalItem;

      } else {
        // select item at position validator
        validator = validateItemAtPosition;
      }

    } else {
      // compile subschema
      this.compile(rctx, schema, 'items');

      // select item schema validator
      validator = validateItemSchema;
    }

    // push validator
    sctx.GET_LOOP_VALIDATORS_FOR_TYPE['array']
      .push(validator);
  }
};

function validateItemSchema(rctx, sctx, dctx, schema, data, i) {
  this.validate(rctx, schema.items, data[i]);
}

function validateItemAtPosition(rctx, sctx, dctx, schema, data, i) {
  // validate item at position
  if (i < sctx.ITEMS_LENGTH) {
    this.validate(rctx, schema.items[i], data[i]);
  }
}

function validateItemOrAdditionalItem(rctx, sctx, dctx, schema, data, i) {
  if (i < sctx.ITEMS_LENGTH) {
    // validate item at position
    this.validate(rctx, schema.items[i], data[i]);

  } else {
    // validate additional item
    this.validate(rctx, schema.additionalItems, data[i]);
  }
}
