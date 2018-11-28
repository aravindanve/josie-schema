# Josie Schema

JSON Schema Builder and Validator

## Usage

```js
import * as josie from 'josie-schema';

const schema = josie.compile({
    type: 'object',
    required: ['name', 'email'],
    properties: {
        name: {
            type: 'string',
            minLength: 2,
            maxLength: 200
        },
        email: {
            type: 'string',
            format: 'email'
        },
        age: {
            type: 'number',
            minimum: 18,
            exclusiveMaximum: 120
        }
    },
    additionalProperties: false
});

schema.validate({
    name: 'Josie',
    email: 'josie@example.com',
    age: 26
});
```

## Custom Features

The following custom features are available.

__TODO__

## Unsupported Features

The following from `draft-07` are **NOT SUPPORTED**:

* keywords `contentEncoding` and `contentMediaType`
* formats `idn-email`, `idn-hostname`, `iri`, and `iri-reference`
* `$ref`s to remote urls

## Test

```bash
# fetch JSON-Schema-Test-Suite
git submodule update --init

# run tests
npm test
```

## Build Example

For testing type definitions

```bash
npm run build:example
```
