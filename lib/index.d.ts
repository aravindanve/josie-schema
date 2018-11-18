declare namespace josie {
  type PickTypes<Base, T> = Pick<Base, { [K in keyof Base]: Base[K] extends T ? K : never; }[keyof Base]>;

  export type Primitive = null | boolean | number | string;
  export type SchemaType = 'null' | 'boolean' | 'number' | 'integer' | 'string' | 'array' | 'object';
  export type SchemaFormat =
    'date-time' | 'date' | 'time' | 'email' | 'idn-email' | 'hostname' | 'idn-hostname' |
    'ipv4' | 'ipv6' | 'uri' | 'uri-reference' | 'iri' | 'iri-reference' | 'uri-template' |
    'json-pointer' | 'relative-json-pointer' | 'regex';

  export enum Types {
    BOOLEAN = 'boolean',
    NULL = 'null',
    NUMBER = 'number',
    INTEGER = 'integer',
    STRING = 'string',
    ARRAY = 'array',
    OBJECT = 'object'
  }

  export enum Formats {
    DATE_TIME = 'date-time',
    DATE = 'date',
    TIME = 'time',
    EMAIL = 'email',
    IDN_EMAIL = 'idn-email',
    HOSTNAME = 'hostname',
    IDN_HOSTNAME = 'idn-hostname',
    IPV4 = 'ipv4',
    IPV6 = 'ipv6',
    URI = 'uri',
    URI_REFERENCE = 'uri-reference',
    IRI = 'iri',
    IRI_REFERENCE = 'iri-reference',
    URI_TEMPLATE = 'uri-template',
    JSON_POINTER = 'json-pointer',
    RELATIVE_JSON_POINTER = 'relative-json-pointer',
    REGEX = 'regex'
  }

  export interface Schema {
    type?: SchemaType | SchemaType[];
    enum?: [Primitive];
    const?: Primitive;
    default?: any;

    items: Primitive | Schema | Primitive[] | Schema[];
    maxItems: number;
    minItems: number;
    uniqueItems: boolean;
    contains: Schema;
  }

  export interface Builder {
    type(value: SchemaType, ...rest: SchemaType[]): Builder;
    hasType(...values: SchemaType[]): boolean;

    enum(value: Primitive, ...rest: Primitive[]): Builder;
    const(value: Primitive): Builder;
    default(value: any): Builder;

    literal(value: Primitive): Builder;

    null(): Builder;

    boolean(): Builder;

    number(): Builder;
    multipleOf(value: number): Builder;
    maximum(value: number): Builder;
    exclusiveMaximum(value: number): Builder;
    minimum(value: number): Builder;
    exclusiveMinimum(value: number): Builder;

    integer(): Builder;

    string(): Builder;
    format(value: SchemaFormat): Builder;
    pattern(value: string | RegExp): Builder;
    dateTime(): Builder;
    date(): Builder;
    time(): Builder;
    email(): Builder;
    idnEmail(): Builder;
    hostname(): Builder;
    idnHostname(): Builder;
    ipv4(): Builder;
    ipv6(): Builder;
    uri(): Builder;
    uriReference(): Builder;
    iri(): Builder;
    iriReference(): Builder;
    uriTemplate(): Builder;
    jsonPointer(): Builder;
    relativeJsonPointer(): Builder;
    regex(): Builder;
    content(encoding: string, mediaType: string): Builder;

    array(items?: Schema | Builder | Schema[] | Builder[]): Builder;
    items(value: Schema | Builder | Schema[] | Builder[]): Builder;
    maxItems(value: number): Builder;
    minItems(value: number): Builder;
    uniqueItems(value: boolean): Builder;
    contains(value: Schema | Builder): Builder;

    object(properties?: { [k: string]: Schema | Builder }): Builder;
    properties(value: { [k: string]: Schema | Builder }): Builder;
    maxProperties(value: number): Builder;
    minProperties(value: number): Builder;
    patternProperties(value: { [k: string]: Schema | Builder }): Builder;
    additionalProperties(value: boolean): Builder;
    propertyNames(value: Schema | Builder): Builder;
  }

  export interface checkUtils {
    isUndefined(value: any): boolean;
    isNull(value: any): boolean;
    isBoolean(value: any): boolean;
    isNumber(value: any): boolean;
    isNonZeroNumber(value: any): boolean;
    isPositiveNumber(value: any): boolean;
    isNegativeNumber(value: any): boolean;
    isInteger(value: any): boolean;
    isNonZeroInteger(value: any): boolean;
    isPositiveInteger(value: any): boolean;
    isNegativeInteger(value: any): boolean;
    isString(value: any): boolean;
    isNonEmptyString(value: any): boolean;
    isArray(value: any): boolean;
    isNonEmptyArray(value: any): boolean;
    isObject(value: any): boolean;
    isNonEmptyObject(value: any): boolean;
  }

  export class Builder {
    constructor(value?: Primitive | { [k: string]: Schema | Builder });
  }

  export interface BuilderStatic extends PickTypes<Builder, Function> {
    (value?: Primitive | { [k: string]: Schema | Builder }): Builder;
    types: typeof Types;
    formats: typeof Formats;
    check: checkUtils;
  }
}

declare const schema: josie.BuilderStatic;
export = schema;
