function makeStaticAliases(Constructor) {
  for (const name of Object.getOwnPropertyNames(Constructor.prototype)) {
    if (typeof Constructor.prototype[name] === 'function' && !Constructor[name]) {
      Constructor[name] = function (...args) {
        return Constructor()[name](...args);
      };
    }
  }
};

module.exports = makeStaticAliases;
