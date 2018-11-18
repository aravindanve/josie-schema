const Builder = require('../Builder');
const { assert } = require('chai');

describe('builder.boolean()', () => {
  it('must set correct `type`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().boolean()),
      JSON.stringify({ type: 'boolean' }));
  });
});
