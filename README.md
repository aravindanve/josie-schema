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
            type: string,
            minLength: 2,
            maxLength: 200
        },
        email: {
            type: 'string',
            format: 'email'
        },
        age: {
            type: number,
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

// NOTE: not yet implemented
const schema2 = josie.object({
        name: josie.string(2, 200).required(),
        email: josie.email().required(),
        age: josie.number(18, 120)
    })
    .additionalProperties(false)
    .compile();

schema2.validate({
    name: 'Josie',
    email: 'josie@example.com',
    age: 26
});
```

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
