const Builder = require('../Builder');
const { assert } = require('chai');

describe('builder.integer()', () => {
  it('must set correct `type`', () => {
    assert.equal(
      JSON.stringify(Builder().integer()),
      JSON.stringify({ type: 'integer' }));
  });
});
