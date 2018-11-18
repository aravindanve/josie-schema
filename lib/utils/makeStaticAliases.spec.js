const Builder = require('../builder/Builder');
const makeStaticAliases = require('./makeStaticAliases');
const { assert } = require('chai');

describe('makeStaticAliases(Constructor)', () => {
  it('must alias instance methods properly', () => {
    function TestClass(...args) {
      if (!(this instanceof TestClass)) return new TestClass(...args);
    }
    TestClass.prototype.doSomething = function (arg1, arg2) {
      return arg1 + arg2;
    };
    makeStaticAliases(TestClass);
    assert.equal(
      TestClass().doSomething(5, 10),
      TestClass.doSomething(5, 10)
    );
  });

  it('must alias Builder instance methods properly', () => {
    assert.equal(
      JSON.stringify(Builder().type('number')),
      JSON.stringify(Builder.type('number')));
  });
});
