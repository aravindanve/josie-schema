const chai = require('chai');
const jst = require('json-schema-test');
const josie = require('..');

function afterEach(result) {
  // result is an object with properties:
  //   validator, schema, data,
  //   valid (validation result), expected (expected validation result),
  //   errors (array of errors or null), passed (true if valid == expected)

  // you can do some additional validation and logging
  // ...
  // console.log(res);

  // Pass option log == false to prevent default error logging

  // If result.passed is false the test will fails after this function returns
}

function afterError(err) {
  // result is an object with properties:
  //   validator, schema, data,
  //   valid (validation result), expected (expected validation result),
  //   errors (array of errors or null), passed (true if valid == expected)

  // you can do some additional validation and logging
  // ...
  // console.log(res);

  // Pass option log == false to prevent default error logging

  // If result.passed is false the test will fails after this function returns
}

jst({
  validate(schema, data) {
    try {
      josie.compile(schema).validate(data);
      this.errors = [];
      return true;

    } catch (err) {
      this.errors = [err];
      return false;
    }
  },
  errors: []

}, {
  description: 'Josie Schema Tests',
  suites: {
    'JSON-Schema-Test-Suite/draft-07': './JSON-Schema-Test-Suite/tests/draft7/{**/,}*.json',
    // 'Advanced Tests': './tests/{**/,}*.json'
  },
  skip: [
    'draft7/ref',
    'draft7/refRemote',
    'draft7/definitions',
    'optional/content',
    'format/idn-email',
    'format/idn-hostname',
    'format/iri',
    'format/iri-reference',
  ],
  async: false,
  afterEach,
  afterError,
  log: true,
  cwd: __dirname,
  timeout: 10000,
  assert: chai.assert
});
