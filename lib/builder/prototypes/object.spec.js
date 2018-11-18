const Builder = require('../Builder');
const { assert } = require('chai');

describe('builder.object(properties)', () => {
  it('must set correct `type`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().object()),
      JSON.stringify({ type: 'object' }));
  });

  it('must set correct types when chained', () => {
    assert.strictEqual(
      JSON.stringify(Builder.string().object()),
      JSON.stringify({ type: ['string', 'object'] }))
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
        type: 'object',
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
      JSON.stringify(Builder().object().maxProperties(5)),
      JSON.stringify({
        type: 'object',
        maxProperties: 5
      }));
  });

  it('must auto set `type: object`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().maxProperties(5)),
      JSON.stringify({
        type: 'object',
        maxProperties: 5
      }));
  });
});

describe('builder.minProperties(value)', () => {
  it('must set `minProperties`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().object().minProperties(5)),
      JSON.stringify({
        type: 'object',
        minProperties: 5
      }));
  });

  it('must auto set `type: object`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().minProperties(5)),
      JSON.stringify({
        type: 'object',
        minProperties: 5
      }));
  });
});

describe('builder.patternProperties(value)', () => {
  it('must set `patternProperties`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().object().patternProperties({
        '^user_': { type: 'string' },
      })),
      JSON.stringify({
        type: 'object',
        patternProperties: {
          '^user_': { type: 'string' },
        }
      }));
  });

  it('must auto set `type: object`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().patternProperties({
        '^user_': { type: 'string' },
      })),
      JSON.stringify({
        type: 'object',
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
      JSON.stringify({
        type: 'object',
        additionalProperties: true
      }));
  });
});

describe('builder.propertyNames(value)', () => {
  it('must set `propertyNames`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().object().propertyNames({
        type: 'string',
        format: 'email'
      })),
      JSON.stringify({
        type: 'object',
        propertyNames: {
          type: 'string',
          format: 'email'
        }
      }));
  });

  it('must auto set `type: object`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().propertyNames({
        type: 'string',
        format: 'email'
      })),
      JSON.stringify({
        type: 'object',
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
