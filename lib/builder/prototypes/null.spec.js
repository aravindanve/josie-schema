const Builder = require('../Builder');
const { assert } = require('chai');

describe('builder.null()', () => {
  it('must set correct `type`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().null()),
      JSON.stringify({ type: 'null' }));
  });
});
