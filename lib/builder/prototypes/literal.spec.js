const Builder = require('../Builder');
const TypeString = require('../../constants/TypeString');
const { assert } = require('chai');

describe('builder.literal(value)', () => {
  it('must set `const`', () => {
    assert.equal(
      JSON.stringify(Builder().literal(5)),
      JSON.stringify({ const: 5 }));
  });
});
