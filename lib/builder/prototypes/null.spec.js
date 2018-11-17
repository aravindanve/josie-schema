const Builder = require('../Builder');
const TypeString = require('../../constants/TypeString');
const { assert } = require('chai');

describe('builder.null()', () => {
  it('must set correct `type`', () => {
    assert.equal(
      JSON.stringify(Builder().null()),
      JSON.stringify({ type: TypeString.NULL }));
  });
});
