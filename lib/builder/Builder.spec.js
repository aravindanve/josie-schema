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

describe('Builder(value)', () => {
  it('when value is null, must set `const: null`', () => {
    assert.equal(
      JSON.stringify(Builder(null)),
      JSON.stringify({ const: null }));
  });

  it('when value is a boolean, must set `const: value`', () => {
    assert.equal(
      JSON.stringify(Builder(false)),
      JSON.stringify({ const: false }));
  });

  it('when value is a number, must set `const: value`', () => {
    assert.equal(
      JSON.stringify(Builder(42)),
      JSON.stringify({ const: 42 }));
  });

  it('when value is a string, must set `const: value`', () => {
    assert.equal(
      JSON.stringify(Builder('Hello World!')),
      JSON.stringify({ const: 'Hello World!' }));
  });

  it('when value is an object, must alias `.object()`', () => {
    assert.equal(
      JSON.stringify(Builder({
        name: Builder.string(),
        age: Builder.number()
      })),
      JSON.stringify({
        type: TypeString.OBJECT,
        properties: {
          name: {
            type: TypeString.STRING
          },
          age: {
            type: TypeString.NUMBER
          }
        }
      }));
  });
});

describe('builder...', () => {
  it('must produce valid schema on chaining', () => {
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
