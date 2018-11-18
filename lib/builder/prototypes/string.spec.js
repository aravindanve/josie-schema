const Builder = require('../Builder');
const { assert } = require('chai');

describe('builder.string()', () => {
  it('must set correct `type`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().string()),
      JSON.stringify({ type: 'string' }));
  });

  it('must set correct types when chained', () => {
    assert.strictEqual(
      JSON.stringify(Builder.number().string()),
      JSON.stringify({ type: ['number', 'string'] }))
  });
});

describe('builder.pattern(value)', () => {
  it('must set correct `pattern` on string value', () => {
    assert.strictEqual(
      JSON.stringify(Builder().pattern('^[a-bA-B0-9]{1,25}$')),
      JSON.stringify({
        type: 'string',
        pattern: '^[a-bA-B0-9]{1,25}$'
      }));
  });

  it('must set correct `pattern` on regex value', () => {
    assert.strictEqual(
      JSON.stringify(Builder().pattern(/^[a-bA-B0-9]{1,25}$/)),
      JSON.stringify({
        type: 'string',
        pattern: '^[a-bA-B0-9]{1,25}$'
      }));
  });
});

describe('builder.format(value)', () => {
  it('must set `format`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().format('email')),
      JSON.stringify({
        type: 'string',
        format: 'email'
      }));
  });
});

describe('builder.dateTime()', () => {
  it('must set correct `format`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().dateTime()),
      JSON.stringify({
        type: 'string',
        format: 'date-time'
      }));
  });
});

describe('builder.date()', () => {
  it('must set correct `format`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().date()),
      JSON.stringify({
        type: 'string',
        format: 'date'
      }));
  });
});

describe('builder.time()', () => {
  it('must set correct `format`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().time()),
      JSON.stringify({
        type: 'string',
        format: 'time'
      }));
  });
});

describe('builder.email()', () => {
  it('must set correct `format`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().email()),
      JSON.stringify({
        type: 'string',
        format: 'email'
      }));
  });
});

describe('builder.hostname()', () => {
  it('must set correct `format`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().hostname()),
      JSON.stringify({
        type: 'string',
        format: 'hostname'
      }));
  });
});

describe('builder.ipv4()', () => {
  it('must set correct `format`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().ipv4()),
      JSON.stringify({
        type: 'string',
        format: 'ipv4'
      }));
  });
});

describe('builder.ipv6()', () => {
  it('must set correct `format`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().ipv6()),
      JSON.stringify({
        type: 'string',
        format: 'ipv6'
      }));
  });
});

describe('builder.uri()', () => {
  it('must set correct `format`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().uri()),
      JSON.stringify({
        type: 'string',
        format: 'uri'
      }));
  });
});

describe('builder.uriReference()', () => {
  it('must set correct `format`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().uriReference()),
      JSON.stringify({
        type: 'string',
        format: 'uri-reference'
      }));
  });
});

describe('builder.uriTemplate()', () => {
  it('must set correct `format`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().uriTemplate()),
      JSON.stringify({
        type: 'string',
        format: 'uri-template'
      }));
  });
});

describe('builder.regex()', () => {
  it('must set correct `format`', () => {
    assert.strictEqual(
      JSON.stringify(Builder().regex()),
      JSON.stringify({
        type: 'string',
        format: 'regex'
      }));
  });
});

describe('builder.string()...', () => {
  it('must produce valid schema on chaining', () => {
    assert.strictEqual(
      JSON.stringify(Builder()
        .string()
        .email()
        .pattern(/^[a-z][a-z0-9\.]{2,}@/)),
      JSON.stringify({
        type: 'string',
        format: 'email',
        pattern: '^[a-z][a-z0-9\\.]{2,}@'
      }));
  });
});
