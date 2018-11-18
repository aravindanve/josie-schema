const Builder = require('../Builder');
const { assert } = require('chai');

describe('builder.number()', () => {
  it('must set correct `type`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().number()),
      JSON.stringify({ type: 'number' }));
  });

  it('must set correct types when chained', () => {
    assert.strictEqual(
      JSON.stringify(Builder.string().number()),
      JSON.stringify({ type: ['string', 'number'] }))
  });
});

describe('builder.multipleOf(value)', () => {
  it('must set `multipleOf`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().multipleOf(10)),
      JSON.stringify({
        type: 'number',
        multipleOf: 10
      }));
  });
});

describe('builder.maximum(value)', () => {
  it('must set `maximum`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().maximum(10)),
      JSON.stringify({
        type: 'number',
        maximum: 10
      }));
  });
});

describe('builder.exclusiveMaximum(value)', () => {
  it('must set `exclusiveMaximum`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().exclusiveMaximum(10)),
      JSON.stringify({
        type: 'number',
        exclusiveMaximum: 10
      }));
  });
});

describe('builder.minimum(value)', () => {
  it('must set `minimum`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().minimum(10)),
      JSON.stringify({
        type: 'number',
        minimum: 10
      }));
  });
});

describe('builder.exclusiveMinimum(value)', () => {
  it('must set `exclusiveMinimum`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().exclusiveMinimum(10)),
      JSON.stringify({
        type: 'number',
        exclusiveMinimum: 10
      }));
  });
});

describe('builder.number()...', () => {
  it('must produce valid schema on chaining', () => {
    assert.strictEqual(
      JSON.stringify(Builder()
        .number()
        .multipleOf(10)
        .maximum(100)
        .exclusiveMinimum(10)),
      JSON.stringify({
        type: 'number',
        multipleOf: 10,
        maximum: 100,
        exclusiveMinimum: 10
      }));
    assert.strictEqual(
      JSON.stringify(Builder()
        .number()
        .multipleOf(10)
        .minimum(10)
        .exclusiveMaximum(100)),
      JSON.stringify({
        type: 'number',
        multipleOf: 10,
        minimum: 10,
        exclusiveMaximum: 100
      }));
  });
});
