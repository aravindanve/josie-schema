const Builder = require('../Builder');
const { assert } = require('chai');

describe('builder.boolean()', () => {
  it('must set correct `type`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().boolean()),
      JSON.stringify({ type: 'boolean' }));
  });

  it('must set correct types when chained', () => {
    assert.strictEqual(
      JSON.stringify(Builder.string().boolean()),
      JSON.stringify({ type: ['string', 'boolean'] }))
  });
});
