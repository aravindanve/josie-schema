import * as schema from 'josie-schema';

schema.type(schema.types.NULL);
schema().type(schema.types.NULL);
schema.type(schema.types.BOOLEAN);
schema().type(schema.types.BOOLEAN);

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
