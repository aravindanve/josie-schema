import * as schema from 'josie-schema';

schema.type(schema.types.NULL);
schema().type(schema.types.NULL);
schema.type(schema.types.BOOLEAN);
schema().type(schema.types.BOOLEAN);
schema.type(schema.types.NUMBER);
schema().type(schema.types.NUMBER);

schema.literal(null);
schema().literal(null);
schema.literal(true);
schema().literal(false);
schema.literal(1);
schema().literal(1);
schema.literal('Hello World!');
schema().literal('Hello World!');

schema.null();
schema().null();

schema.boolean();
schema().boolean();

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
