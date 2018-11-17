const Builder = require('../Builder');
const TypeString = require('../../constants/TypeString');
const { assert } = require('chai');

describe('builder.boolean()', () => {
  it('must set correct `type`', () => {
    assert.equal(
      JSON.stringify(Builder().boolean()),
      JSON.stringify({ type: TypeString.BOOLEAN }));
  });
});
