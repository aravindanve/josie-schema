const Builder = require('../Builder');
const TypeString = require('../../constants/TypeString');
const { assert } = require('chai');

describe('builder.array(items)', () => {
  it('must set correct `type`', () => {
    assert.equal(
      JSON.stringify(Builder().array()),
      JSON.stringify({ type: TypeString.ARRAY }));
  });

  it('must set `items`', () => {
    assert.equal(
      JSON.stringify(Builder().array({ type: TypeString.NUMBER })),
      JSON.stringify({
        type: TypeString.ARRAY,
        items: { type: TypeString.NUMBER }
      }));
  });
});

describe('builder.items(value)', () => {
  it('must set `items`', () => {
    assert.equal(
      JSON.stringify(Builder().items({ type: TypeString.NUMBER })),
      JSON.stringify({ items: { type: TypeString.NUMBER } }));
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
        .items({ type: TypeString.NUMBER })
        .maxItems(10)
        .minItems(5)
        .uniqueItems(true)
        .contains({ const: 9 })),
      JSON.stringify({
        type: TypeString.ARRAY,
        items: {
          type: TypeString.NUMBER
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
        type: TypeString.ARRAY,
        items: {
          type: TypeString.OBJECT,
          properties: {
            name: {
              type: TypeString.STRING
            },
            email: {
              format: 'email'
            },
            profile: {
              type: TypeString.OBJECT,
              properties: {
                age: {
                  type: TypeString.NUMBER
                },
                city: {
                  type: TypeString.STRING
                }
              }
            },
            tags: {
              type: TypeString.ARRAY,
              items: {
                type: TypeString.STRING
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
