const Builder = require('./Builder');
const TypeString = require('../constants/TypeString');
const { assert } = require('chai');

describe('Builder', () => {
  it('must be a valid constructor', () => {
    assert.instanceOf(new Builder(), Builder);
  });

  it('must return an instance without `new`', () => {
    assert.instanceOf(Builder(), Builder);
  });

  it('must return a unique instance without `new`', () => {
    assert.notEqual(Builder(), Builder());
  });
});

describe('builder.toJSON()', () => {
  it('must return an object', () => {
    assert.typeOf(Builder().toJSON(), 'object');
  });
});

describe('builder.type(value)', () => {
  it('must set `type` property', () => {
    assert.equal(
      JSON.stringify(Builder().type(TypeString.STRING)),
      JSON.stringify({ type: TypeString.STRING }));
  });
});

describe('builder.enum(...values)', () => {
  it('must set `enum` property', () => {
    assert.equal(
      JSON.stringify(Builder().enum('hello', 'world')),
      JSON.stringify({ enum: ['hello', 'world'] }));
  });
});

describe('builder.const(value)', () => {
  it('must set `const` property', () => {
    assert.equal(
      JSON.stringify(Builder().const(435)),
      JSON.stringify({ const: 435 }));
  });
});

describe('builder.default(value)', () => {
  it('must set `default` property', () => {
    assert.equal(
      JSON.stringify(Builder().default(true)),
      JSON.stringify({ default: true }));
  });
});

describe('builder...', () => {
  it('must set properties properly on chaining', () => {
    assert.equal(
      JSON.stringify(Builder()
        .type(TypeString.STRING)
        .enum('hello', 'world')
        .const('hello')
        .default('world')),
      JSON.stringify({
        type: TypeString.STRING,
        enum: ['hello', 'world'],
        const: 'hello',
        default: 'world'
      }));
  });
});
