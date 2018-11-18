import * as josie from 'josie-schema';

// types
type Type = josie.Type;
type Format = josie.Format;
type Schema = josie.Schema;
type SchemaObject = josie.SchemaObject;
type BuilderOrSchema = josie.BuilderOrSchema;
type BuilderOrSchemaItems = josie.BuilderOrSchemaItems;
type BuilderProperties = josie.BuilderProperties;
type Builder = josie.Builder;
type Check = josie.Check;
type BuilderStatic = josie.BuilderStatic; // typeof josie

// static
josie // BuilderStatic
josie.string(); // Builder
josie.email();
josie.type('string');
josie.type('string').format('email');

// as function
josie(); // Builder
josie().string();
josie().email();
josie().type('string');
josie().type('string').format('email');

// as class
(new josie()); // Builder
(new josie()).string();
(new josie()).email();
(new josie()).type(josie.types.STRING);
(new josie()).type(josie.types.STRING).format(josie.formats.EMAIL);

// literals
josie.literal(null);
josie().literal(null);
josie.literal(false);
josie().literal(true);
josie.literal(42);
josie().literal(42);
josie.literal('Hello World!');
josie().literal('Hello World!');
josie.literal([null, true, 50, 'hello', { name: 'Josie' }]);
josie().literal([null, true, 50, 'hello', { name: 'Josie' }]);
josie.literal({ name: 'Josie' });
josie().literal({ name: 'Josie' });

// undefined
josie.check.isUndefined(0); // false
josie.check.isUndefined(undefined);

// null
josie.type(josie.types.NULL);
josie().type('null');
josie.null();
josie().null();
josie.check.isNull(0); // false
josie.check.isNull(null);

// boolean
josie.type(josie.types.BOOLEAN);
josie().type('boolean');
josie.boolean();
josie().boolean();
josie.check.isBoolean(0); // false
josie.check.isBoolean(false);

// number
josie.type(josie.types.NUMBER);
josie().type('number');
josie.number();
josie().number();
josie.number().multipleOf(10);
josie().number().multipleOf(10);
josie.number().maximum(10);
josie().number().maximum(10);
josie.number().exclusiveMaximum(10);
josie().number().exclusiveMaximum(10);
josie.number().minimum(10);
josie().number().minimum(10);
josie.number().exclusiveMinimum(10);
josie().number().exclusiveMinimum(10);
josie.check.isNumber('0'); // false
josie.check.isNumber(0);

// integer
josie.type(josie.types.INTEGER);
josie().type('integer');
josie.integer();
josie().integer();
josie.check.isInteger(0.1); // false
josie.check.isInteger(0);

// string
josie.type(josie.types.STRING);
josie().type('string');
josie.string();
josie().string();
josie.string().maxLength(255);
josie().string().maxLength(255);
josie.string().minLength(1);
josie().string().minLength(1);
josie.string().pattern('[a-z]+');
josie().string().pattern('[a-z]+');
josie.string().pattern(/[a-z]+/);
josie().string().pattern(/[a-z]+/);
josie.string().format(josie.formats.EMAIL);
josie().string().format(josie.formats.EMAIL);
josie.string().dateTime();
josie().string().dateTime();
josie.string().date();
josie().string().date();
josie.string().time();
josie().string().time();
josie.string().email();
josie().string().email();
josie.string().hostname();
josie().string().hostname();
josie.string().ipv4();
josie().string().ipv4();
josie.string().ipv6();
josie().string().ipv6();
josie.string().uri();
josie().string().uri();
josie.string().uriReference();
josie().string().uriReference();
josie.string().uriTemplate();
josie().string().uriTemplate();
josie.string().regex();
josie().string().regex();
josie.check.isString('');
josie.check.isNonEmptyString('hello');

// array
josie.type(josie.types.ARRAY);
josie().type('array');
josie.array();
josie().array();
josie.array(josie.string());
josie().array(josie.string());
josie.array().items(josie.number());
josie().array().items(josie.number());
josie.array().additionalItems(true);
josie().array().additionalItems(josie.number());
josie.array().maxItems(10);
josie().array().maxItems(10);
josie.array().minItems(10);
josie().array().minItems(10);
josie.array().uniqueItems(true);
josie().array().uniqueItems(true);
josie.array().contains(josie.literal(5));
josie().array().contains(josie.literal(5));
josie.check.isArray([]);
josie.check.isNonEmptyArray(['hello']);

// object
josie({});
josie.type(josie.types.OBJECT);
josie().type('object');
josie.object();
josie().object();
josie({
  name: josie.string(),
  age: josie.number()
});
josie.object({
  name: josie.string(),
  age: josie.number()
});
josie().object({
  name: josie.string(),
  age: josie.number()
});
josie.object().properties({
  name: josie.string(),
  age: josie.number()
});
josie().object().properties({
  name: josie.string(),
  age: josie.number()
});
josie.object().maxProperties(10);
josie().object().maxProperties(10);
josie.object().minProperties(1);
josie().object().minProperties(1);
josie.object().patternProperties({
  name: josie.string(),
  age: josie.number()
});
josie().object().patternProperties({
  '^user_': josie.email()
});
josie.object().additionalProperties(true);
josie().object().additionalProperties(josie.date());
josie.object().propertyNames(josie.email());
josie().object().propertyNames(josie.email());
josie.check.isObject({});
josie.check.isNonEmptyObject({ name: 'Josie' });

// multiple types
josie.type('string', 'number');
josie.type('string').type('number').type('null');
josie.string().number().null();
