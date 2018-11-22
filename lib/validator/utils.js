module.exports = {
  asKeyString(data) {
    // TODO: optimize for primitives
    // TODO: fix unordered object keys problem
    return JSON.stringify(data)
  }
};
