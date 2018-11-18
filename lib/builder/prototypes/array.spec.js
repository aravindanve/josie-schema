const Builder = require('../Builder');
const { assert } = require('chai');

describe('builder.array(items)', () => {
  it('must set correct `type`', () => {
    assert.equal(
      JSON.stringify(Builder().array()),
      JSON.stringify({ type: 'array' }));
  });

  it('must set `items`', () => {
    assert.equal(
      JSON.stringify(Builder().array({ type: 'number' })),
      JSON.stringify({
        type: 'array',
        items: { type: 'number' }
      }));
  });
});

describe('builder.items(value)', () => {
  it('must set `items`', () => {
    assert.equal(
      JSON.stringify(Builder().items({ type: 'number' })),
      JSON.stringify({ items: { type: 'number' } }));
  });
});

describe('builder.maxItems(value)', () => {
  it('must set `maxItems`', () => {
    assert.equal(
      JSON.stringify(Builder().maxItems(5)),
      JSON.stringify({ maxItems: 5 }));
  });
});

describe('builder.minItems(value)', () => {
  it('must set `minItems`', () => {
    assert.equal(
      JSON.stringify(Builder().minItems(5)),
      JSON.stringify({ minItems: 5 }));
  });
});

describe('builder.uniqueItems(value)', () => {
  it('must set `uniqueItems`', () => {
    assert.equal(
      JSON.stringify(Builder().uniqueItems(true)),
      JSON.stringify({ uniqueItems: true }));
  });
});

describe('builder.contains(value)', () => {
  it('must set `contains`', () => {
    assert.equal(
      JSON.stringify(Builder().contains({ const: 9 })),
      JSON.stringify({ contains: { const: 9 } }));
  });
});

describe('builder.array(items)...', () => {
  it('must produce valid schema on chaining', () => {
    assert.equal(
      JSON.stringify(Builder()
        .array()
        .items({ type: 'number' })
        .maxItems(10)
        .minItems(5)
        .uniqueItems(true)
        .contains({ const: 9 })),
      JSON.stringify({
        type: 'array',
        items: {
          type: 'number'
        },
        maxItems: 10,
        minItems: 5,
        uniqueItems: true,
        contains: {
          const: 9
        }
      }));
  });

  it('must produce valid schema on nesting', () => {
    assert.equal(
      JSON.stringify(Builder()
        .array(Builder.object({
          name: Builder.string(),
          email: Builder.email(),
          profile: Builder.object({
            age: Builder.number(),
            city: Builder.string()
          }),
          tags: Builder.array(Builder.string())
        }))
        .maxItems(10)
        .minItems(1)
        .uniqueItems(true)),
      JSON.stringify({
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string'
            },
            email: {
              format: 'email'
            },
            profile: {
              type: 'object',
              properties: {
                age: {
                  type: 'number'
                },
                city: {
                  type: 'string'
                }
              }
            },
            tags: {
              type: 'array',
              items: {
                type: 'string'
              }
            }
          }
        },
        maxItems: 10,
        minItems: 1,
        uniqueItems: true
      }));
  });
});
