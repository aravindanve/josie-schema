const keyString = require('../../utils/keyString');

function compile(path, schema) {
  if (schema.uniqueItems === true) {
    // use `uniqueItems`
    return 'uniqueItems';
  }

  // skip validation
  return false;
}

const validate = {
  uniqueItems: function (ctx, schema, data, i) {
    // serialize data into string key
    const dataString = keyString.from(data);

    // check string key against processed values
    if (!ctx.uniqueItemMap[dataString]) {
      // add string key to processed values
      ctx.uniqueItemMap[dataString] = true;

    } else {
      throw 'unique items error';
    }
  }
};

module.exports = {
  name: 'uniqueItems',
  locations: ['/childInstance/array'],
  compile,
  validate
};
