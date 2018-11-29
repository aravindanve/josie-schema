module.exports = {
  name: 'type',
  compile(gctx, sctx, schema) {
    let validator;
    if (Array.isArray(schema.type)) {
      // define type map
      sctx.TYPE_MAP = new Map();
      for (let i = 0, l = schema.type.length; i < l; i++) {
        sctx.TYPE_MAP.set(schema.type[i], true);
      }

      // select type map validator
      validator = validateTypeMap;

    } else {
      // select type validator
      validator = validateType;
    }

    // push validator
    sctx.GET_VALIDATORS_FOR_TYPE['null']
      .push(validator);
    sctx.GET_VALIDATORS_FOR_TYPE['boolean']
      .push(validator);
    sctx.GET_VALIDATORS_FOR_TYPE['number']
      .push(validator);
    sctx.GET_VALIDATORS_FOR_TYPE['integer']
      .push(validator);
    sctx.GET_VALIDATORS_FOR_TYPE['string']
      .push(validator);
    sctx.GET_VALIDATORS_FOR_TYPE['array']
      .push(validator);
    sctx.GET_VALIDATORS_FOR_TYPE['object']
      .push(validator);
  }
};

function validateType(gctx, sctx, dctx, schema, data) {
  if (dctx.DATA_TYPE === schema.type) {
    return;

  } else if (dctx.DATA_TYPE === 'integer' &&
      schema.type === 'number') {
    return;
  }

  throw 'type error';
}

function validateTypeMap(gctx, sctx, dctx, schema, data) {
  if (sctx.TYPE_MAP.has(dctx.DATA_TYPE)) {
    return;

  } else if (dctx.DATA_TYPE === 'integer' &&
      sctx.TYPE_MAP.has('number')) {
    return;
  }

  throw 'type map error';
}
