const defaultOptions = {
  configurable: false,
  enumerable: false,
  writable: false
};

module.exports = {
  makeDescriptorMap(properties, options = defaultOptions) {
    const descriptorMap = {};
    for (const property of Object.keys(properties)) {
      descriptorMap[property] = Object.assign({
        value: properties[property]
      }, options);
    }
    return descriptorMap;
  },
  definePropertiesSimpile(target, properties, options = defaultOptions) {
    return Object.defineProperties(
      target, this.makeDescriptorMap(properties, options));
  }
}
