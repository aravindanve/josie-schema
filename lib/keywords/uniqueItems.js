const stringify = require('../utils/stringify');

module.exports = {
  name: 'uniqueItems',
  compile(sctx, fctx, fragment) {
    // set define data item string map
    fctx.DEFINE_DATA_ITEM_STRING_MAP = true;

    // push validator
    fctx.GET_LOOP_VALIDATORS_FOR_TYPE['array']
      .push(validateUniqueItems);
  }
};

function validateUniqueItems(sctx, fctx, dctx, fragment, data, i) {
  // serialize data item into string key
  const dataItemString = stringify(data[i]);

  // check string key against processed values
  if (!dctx.DATA_ITEM_STRING_MAP.has(dataItemString)) {
    // add string key to processed values
    dctx.DATA_ITEM_STRING_MAP.set(dataItemString, true);

  } else {
    throw 'unique items error';
  }
}
