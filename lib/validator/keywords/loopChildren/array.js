const utils = require('../../utils');

// this ~ { validate() }
module.exports = {
  uniqueItems: function (ctx, schema, data, index) {
    // serialize data into string key
    const dataString = utils.asKeyString(data);

    // check string key against processed values
    if (ctx.uniqueItemMap[dataString]) {
      throw 'unique items error';
    }

    // add string key to processed values
    ctx.uniqueItemMap[dataString] = true;
  },

  items: function (ctx, schema, data, index) {
    // validate data against items schema
    this.validate(schema.items, data);
  },

  itemsArray: function (ctx, schema, data, index) {
    if (index < schema.items.length) {
      // validate data against items schema
      this.validate(schema.items[index], data);

    } else if (schema.additionalItems !== false) {
      // validate data against additional items schema
      this.validate(schema.additionalItems, data);

    } else {
      // throw error
      throw 'additional items error';
    }
  },

  itemsArrayWithAdditionalItems: function (ctx, schema, data, index) {
    // validate data against item schema if within items length
    if (index < schema.items.length) {
      this.validate(schema.items[index], data);
    }
  },

  contains: function (ctx, schema, data, index) {
    // TODO: short circuit
    throw 'contains not implemented';
  }
};
