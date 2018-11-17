const Builder = require('../Builder');
const TypeString = require('../../constants/TypeString');
const FormatString = require('../../constants/FormatString');
const { assert } = require('chai');

describe('builder.object(properties)', () => {
  it('must set correct `type`', () => {
    assert.equal(
      JSON.stringify(Builder().object()),
      JSON.stringify({ type: TypeString.OBJECT }));
  });

  it('must set `properties`', () => {
    assert.equal(
      JSON.stringify(Builder().object({
        name: { type: TypeString.STRING },
        description: { type: TypeString.STRING }
      })),
      JSON.stringify({
        type: TypeString.OBJECT,
        properties: {
          name: { type: TypeString.STRING },
          description: { type: TypeString.STRING }
        }
      }));
  });
});

describe('builder.properties(value)', () => {
  it('must set `properties`', () => {
    assert.equal(
      JSON.stringify(Builder().properties({
        name: { type: TypeString.STRING },
        description: { type: TypeString.STRING }
      })),
      JSON.stringify({
        properties: {
          name: { type: TypeString.STRING },
          description: { type: TypeString.STRING }
        }
      }));
  });
});

describe('builder.maxProperties(value)', () => {
  it('must set `maxProperties`', () => {
    assert.equal(
      JSON.stringify(Builder().maxProperties(5)),
      JSON.stringify({ maxProperties: 5 }));
  });
});

describe('builder.minProperties(value)', () => {
  it('must set `minProperties`', () => {
    assert.equal(
      JSON.stringify(Builder().minProperties(5)),
      JSON.stringify({ minProperties: 5 }));
  });
});

describe('builder.patternProperties(value)', () => {
  it('must set `patternProperties`', () => {
    assert.equal(
      JSON.stringify(Builder().patternProperties({
        '^user_': { type: TypeString.STRING },
      })),
      JSON.stringify({
        patternProperties: {
          '^user_': { type: TypeString.STRING },
        }
      }));
  });
});

describe('builder.additionalProperties(value)', () => {
  it('must set `additionalProperties`', () => {
    assert.equal(
      JSON.stringify(Builder().additionalProperties(true)),
      JSON.stringify({ additionalProperties: true }));
  });
});

describe('builder.propertyNames(value)', () => {
  it('must set `propertyNames`', () => {
    assert.equal(
      JSON.stringify(Builder().propertyNames({
        type: TypeString.STRING,
        format: FormatString.EMAIL
      })),
      JSON.stringify({
        propertyNames: {
          type: TypeString.STRING,
          format: FormatString.EMAIL
        }
      }));
  });
});

describe('builder.object(properties)...', () => {
  it('must produce valid schema on chaining', () => {
    assert.equal(
      JSON.stringify(Builder()
        .object()
        .properties({
          name: {
            type: TypeString.STRING
          },
          email: {
            type: TypeString.STRING,
            format: FormatString.EMAIL
          }
        })
        .additionalProperties(true)),
      JSON.stringify({
        type: TypeString.OBJECT,
        properties: {
          name: {
            type: TypeString.STRING
          },
          email: {
            type: TypeString.STRING,
            format: FormatString.EMAIL
          }
        },
        additionalProperties: true
      }));
  });
});
