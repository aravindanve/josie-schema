module.exports = {
  name: 'items',
  compile(sctx, fctx, fragment) {
    let validator;

    // check if items is an array
    if (Array.isArray(fragment.items)) {
      // define items length
      fctx.ITEMS_LENGTH = fragment.items.length;

      // compile subfragments
      for (let i = 0, l = fragment.items.length; i < l; i++) {
        this.compile(sctx, fragment.items, i);
      }

      // handle `additionalItems`
      if ('additionalItems' in fragment) {
        // compile subfragment
        this.compile(sctx, fragment, 'additionalItems');

        // select item or additional item validator
        validator = validateItemOrAdditionalItem;

      } else {
        // select item at position validator
        validator = validateItemAtPosition;
      }

    } else {
      // compile subfragment
      this.compile(sctx, fragment, 'items');

      // select item fragment validator
      validator = validateItemSchema;
    }

    // push validator
    fctx.GET_LOOP_VALIDATORS_FOR_TYPE['array']
      .push(validator);
  }
};

function validateItemSchema(sctx, fctx, dctx, fragment, data, i) {
  this.validate(sctx, fragment.items, data[i]);
}

function validateItemAtPosition(sctx, fctx, dctx, fragment, data, i) {
  // validate item at position
  if (i < fctx.ITEMS_LENGTH) {
    this.validate(sctx, fragment.items[i], data[i]);
  }
}

function validateItemOrAdditionalItem(sctx, fctx, dctx, fragment, data, i) {
  if (i < fctx.ITEMS_LENGTH) {
    // validate item at position
    this.validate(sctx, fragment.items[i], data[i]);

  } else {
    // validate additional item
    this.validate(sctx, fragment.additionalItems, data[i]);
  }
}
