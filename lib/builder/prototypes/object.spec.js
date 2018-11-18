const Builder = require('../Builder');
const { assert } = require('chai');

describe('builder.object(properties)', () => {
  it('must set correct `type`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().object()),
      JSON.stringify({ type: 'object' }));
  });

  it('must set `properties`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().object({
        name: { type: 'string' },
        description: { type: 'string' }
      })),
      JSON.stringify({
        type: 'object',
        properties: {
          name: { type: 'string' },
          description: { type: 'string' }
        }
      }));
  });
});

describe('builder.properties(value)', () => {
  it('must set `properties`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().properties({
        name: { type: 'string' },
        description: { type: 'string' }
      })),
      JSON.stringify({
        properties: {
          name: { type: 'string' },
          description: { type: 'string' }
        }
      }));
  });
});

describe('builder.maxProperties(value)', () => {
  it('must set `maxProperties`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().maxProperties(5)),
      JSON.stringify({ maxProperties: 5 }));
  });
});

describe('builder.minProperties(value)', () => {
  it('must set `minProperties`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().minProperties(5)),
      JSON.stringify({ minProperties: 5 }));
  });
});

describe('builder.patternProperties(value)', () => {
  it('must set `patternProperties`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().patternProperties({
        '^user_': { type: 'string' },
      })),
      JSON.stringify({
        patternProperties: {
          '^user_': { type: 'string' },
        }
      }));
  });
});

describe('builder.additionalProperties(value)', () => {
  it('must set `additionalProperties`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().additionalProperties(true)),
      JSON.stringify({ additionalProperties: true }));
  });
});

describe('builder.propertyNames(value)', () => {
  it('must set `propertyNames`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().propertyNames({
        type: 'string',
        format: 'email'
      })),
      JSON.stringify({
        propertyNames: {
          type: 'string',
          format: 'email'
        }
      }));
  });
});

describe('builder.object(properties)...', () => {
  it('must produce valid schema on chaining', () => {
    assert.strictEqual(
      JSON.stringify(Builder()
        .object()
        .properties({
          name: {
            type: 'string'
          },
          email: {
            type: 'string',
            format: 'email'
          }
        })
        .additionalProperties(true)),
      JSON.stringify({
        type: 'object',
        properties: {
          name: {
            type: 'string'
          },
          email: {
            type: 'string',
            format: 'email'
          }
        },
        additionalProperties: true
      }));
  });
});
