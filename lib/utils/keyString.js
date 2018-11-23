module.exports = {
  from(value) {
    // TODO: optimize for primitives
    // TODO: fix unordered object keys problem
    // TODO: check stringification caveats, such as NaN -> null
    return JSON.stringify(value);
  }
};
