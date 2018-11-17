const Builder = require('./builder/Builder');
const index = require('.');
const { assert } = require('chai');

describe('module', () => {
  it('must export Builder', () => {
    assert.equal(index, Builder);
  });
});
