module.exports = {
  name: 'properties',
  compile(sctx, fctx, fragment) {
    // compile subfragments
    const properties = Object.keys(fragment.properties);
    for (const property of properties) {
      this.compile(sctx, fragment.properties, property);
    }

    // push validator
    fctx.GET_LOOP_VALIDATORS_FOR_TYPE['object']
      .push(validateProperty);
  }
};

function validateProperty(sctx, fctx, dctx, fragment, data, property) {
  if (property in fragment.properties) {
    dctx.IS_ADDITIONAL = false;
    this.validate(sctx, fragment.properties[property], data[property]);
  }
}
