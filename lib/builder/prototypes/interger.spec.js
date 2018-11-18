const Builder = require('../Builder');
const { assert } = require('chai');

describe('builder.integer()', () => {
  it('must set correct `type`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().integer()),
      JSON.stringify({ type: 'integer' }));
  });

  it('must set correct types when chained', () => {
    assert.strictEqual(
      JSON.stringify(Builder.string().integer()),
      JSON.stringify({ type: ['string', 'integer'] }))
  });
});
