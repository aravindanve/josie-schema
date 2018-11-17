import * as schema from 'josie-schema';

schema.literal(null);
schema().literal(null);
schema.literal(true);
schema().literal(false);
schema.literal(1);
schema().literal(1);
schema.literal('Hello World!');
schema().literal('Hello World!');

schema.type(schema.types.NULL);
schema().type(schema.types.NULL);
schema.null();
schema().null();

schema.type(schema.types.BOOLEAN);
schema().type(schema.types.BOOLEAN);
schema.boolean();
schema().boolean();

schema.type(schema.types.NUMBER);
schema().type(schema.types.NUMBER);
schema.number();
schema().number();
schema.number().multipleOf(10);
schema().number().multipleOf(10);
schema.number().maximum(10);
schema().number().maximum(10);
schema.number().exclusiveMaximum(10);
schema().number().exclusiveMaximum(10);
schema.number().minimum(10);
schema().number().minimum(10);
schema.number().exclusiveMinimum(10);
schema().number().exclusiveMinimum(10);

schema.type(schema.types.INTEGER);
schema().type(schema.types.INTEGER);
schema.integer();
schema().integer();

schema.type(schema.types.STRING);
schema().type(schema.types.STRING);
schema.string();
schema().string();
schema.string().format(schema.formats.EMAIL);
schema().string().format(schema.formats.EMAIL);
schema.string().pattern('[a-z]+');
schema().string().pattern('[a-z]+');
schema.string().pattern(/[a-z]+/);
schema().string().pattern(/[a-z]+/);
schema.string().dateTime();
schema().string().dateTime();
schema.string().date();
schema().string().date();
schema.string().time();
schema().string().time();
schema.string().email();
schema().string().email();
schema.string().idnEmail();
schema().string().idnEmail();
schema.string().hostname();
schema().string().hostname();
schema.string().idnHostname();
schema().string().idnHostname();
schema.string().ipv4();
schema().string().ipv4();
schema.string().ipv6();
schema().string().ipv6();
schema.string().uri();
schema().string().uri();
schema.string().uriReference();
schema().string().uriReference();
schema.string().iri();
schema().string().iri();
schema.string().iriReference();
schema().string().iriReference();
schema.string().uriTemplate();
schema().string().uriTemplate();
schema.string().jsonPointer();
schema().string().jsonPointer();
schema.string().relativeJsonPointer();
schema().string().relativeJsonPointer();
schema.string().regex();
schema().string().regex();
schema.string().content('base64', 'image/png');
schema().string().content('base64', 'image/png');

schema.type(schema.types.ARRAY);
schema().type(schema.types.ARRAY);
schema.array();
schema().array();
schema.array(schema.string());
schema().array(schema.string());
schema.array().items(schema.number());
schema().array().items(schema.number());
schema.array().maxItems(10);
schema().array().maxItems(10);
schema.array().minItems(10);
schema().array().minItems(10);
schema.array().uniqueItems(true);
schema().array().uniqueItems(true);
schema.array().contains(schema.literal(5));
schema().array().contains(schema.literal(5));

schema.type(schema.types.OBJECT);
schema().type(schema.types.OBJECT);
schema.object();
schema().object();
schema.object({
  name: schema.string(),
  age: schema.number()
});
schema().object({
  name: schema.string(),
  age: schema.number()
});
schema.object().properties({
  name: schema.string(),
  age: schema.number()
});
schema().object().properties({
  name: schema.string(),
  age: schema.number()
});
schema.object().maxProperties(10);
schema().object().maxProperties(10);
schema.object().minProperties(1);
schema().object().minProperties(1);
schema.object().patternProperties({
  name: schema.string(),
  age: schema.number()
});
schema().object().patternProperties({
  '^user_': schema.email()
});
schema.object().additionalProperties(true);
schema().object().additionalProperties(true);
schema.object().propertyNames(schema.email());
schema().object().propertyNames(schema.email());
