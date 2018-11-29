const stringify = require('../../utils/stringify');

module.exports = {
  name: 'uniqueItems',
  compile(gctx, sctx, schema) {
    // set define data item string map
    sctx.DEFINE_DATA_ITEM_STRING_MAP = true;

    // push validator
    sctx.GET_LOOP_VALIDATORS_FOR_TYPE['array']
      .push(validateUniqueItems);
  }
};

function validateUniqueItems(gctx, sctx, dctx, schema, data, i) {
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
