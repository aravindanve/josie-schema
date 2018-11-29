const context = require('./context');
const stringify = require('./utils/stringify');

const self = module.exports = {
  validate(rctx, schema, data) {
    // handle boolean schemas
    if (schema === false) {
      throw 'false error';
    }
    if (schema === true) {
      return;
    }

    // get schema context
    const sctx = context.getSchemaContext(rctx, schema);

    // create data context
    const dctx = {};

    // define data type
    dctx.DATA_TYPE = typeof data;

    // define type based information
    switch (dctx.DATA_TYPE) {
      case 'string':
        // OPTIMIZE: eval unicode character length without spreading
        // https://dmitripavlutin.com/what-every-javascript-developer-should-know-about-unicode/
        dctx.DATA_LENGTH = [...data].length;
        break;

      case 'number':
        if (Number.isInteger(data)) {
          dctx.DATA_TYPE = 'integer';
        }
        break;

      case 'object':
        if (data === null) {
          dctx.DATA_TYPE = 'null';

        } else if (Array.isArray(data)) {
          dctx.DATA_TYPE = 'array';
          dctx.DATA_LENGTH = data.length;
          dctx.LOOP_REQUIRED = true;

        } else {
          dctx.DATA_KEYS = Object.keys(data);
          dctx.DATA_LENGTH = dctx.DATA_KEYS.length;
          dctx.LOOP_REQUIRED = true;
        }
        break;
    }

    // define data string if required
    if (sctx.DEFINE_DATA_STRING) {
      dctx.DATA_STRING = stringify(data);
    }

    // get validators
    const validators = sctx.GET_VALIDATORS_FOR_TYPE[dctx.DATA_TYPE];

    // iterate through validators in queue
    for (const validator of validators) {
      validator.call(self, rctx, sctx, dctx, schema, data);
    }

    // return if loop not required
    if (!dctx.LOOP_REQUIRED) return;

    // get loop validators
    const loopValidators = sctx.GET_LOOP_VALIDATORS_FOR_TYPE[dctx.DATA_TYPE];

    // return if no loop validators found
    if (!loopValidators.length) return;

    if (dctx.DATA_KEYS) {
      // iterate through data object keys
      for (const key of dctx.DATA_KEYS) {
        // set is additional flag for current key
        dctx.IS_ADDITIONAL = true;

        // iterate through in-loop validators in queue
        for (const validator of loopValidators) {
          validator.call(self, rctx, sctx, dctx, schema, data, key);
        }
      }

    } else {
      // define item string map if required
      if (sctx.DEFINE_DATA_ITEM_STRING_MAP) {
        dctx.DATA_ITEM_STRING_MAP = new Map();
      }

      // iterate through data array indexes
      for (let i = 0, l = dctx.DATA_LENGTH; i < l; i++) {
        // iterate through in-loop validators in queue
        for (const validator of loopValidators) {
          validator.call(self, rctx, sctx, dctx, schema, data, i);
        }
      }
    }
  }
};
