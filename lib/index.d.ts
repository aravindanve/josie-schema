// reference: https://json-schema.org/latest/json-schema-validation.html
// based on json-schema-draft-07

type PickByType<Base, T> = Pick<Base, { [K in keyof Base]: Base[K] extends T ? K : never; }[keyof Base]>;

declare namespace Josie {
  export type Primitive = null | boolean | number | string;
  export type SchemaType = 'null' | 'boolean' | 'number' | 'integer' | 'string' | 'array' | 'object';
  export type SchemaFormat =
    'date-time' | 'date' | 'time' | 'email' | 'idn-email' | 'hostname' | 'idn-hostname' |
    'ipv4' | 'ipv6' | 'uri' | 'uri-reference' | 'iri' | 'iri-reference' | 'uri-template' |
    'json-pointer' | 'relative-json-pointer' | 'regex';

  export interface Schema {
    type?: SchemaType | SchemaType[];
    enum?: [Primitive];
    const?: Primitive;
    default?: any;

    multipeOf?: number;
    maximum?: number;
    exclusiveMaximum?: number;
    minimum?: number;
    exclusiveMinimum?: number;

    maxLength?: number;
    minLength?: number;
    pattern?: string;
    format?: SchemaFormat;
    contentEncoding?: string;
    contentMediaType?: string;

    items?: Schema | Schema[];
    additionalItems?: boolean;
    maxItems?: number;
    minItems?: number;
    uniqueItems?: boolean;
    contains?: Schema;

    maxProperties?: number;
    minProperties?: number;
    properties?: { [name: string]: Schema; };
    patternProperties?: { [name: string]: Schema; };
    additionalProperties?: boolean;
    propertyNames?: Schema;

    if?: Schema;
    then?: Schema;
    else?: Schema;

    allOf?: Schema[];
    anyOf?: Schema[];
    oneOf?: Schema[];
    not?: Schema;
  }

  export type BuilderItems = Schema | Builder | (Schema | Builder)[];

  export interface BuilderPropertyMap {
    [property: string]: Schema | Builder;
  }

  export interface Types {
    BOOLEAN: 'boolean';
    NULL: 'null';
    NUMBER: 'number';
    INTEGER: 'integer';
    STRING: 'string';
    ARRAY: 'array';
    OBJECT: 'object';
  }

  export interface Formats {
    DATE_TIME: 'date-time';
    DATE: 'date';
    TIME: 'time';
    EMAIL: 'email';
    IDN_EMAIL: 'idn-email';
    HOSTNAME: 'hostname';
    IDN_HOSTNAME: 'idn-hostname';
    IPV4: 'ipv4';
    IPV6: 'ipv6';
    URI: 'uri';
    URI_REFERENCE: 'uri-reference';
    IRI: 'iri';
    IRI_REFERENCE: 'iri-reference';
    URI_TEMPLATE: 'uri-template';
    JSON_POINTER: 'json-pointer';
    RELATIVE_JSON_POINTER: 'relative-json-pointer';
    REGEX: 'regex';
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
    maxLength(value: number): Builder;
    minLength(value: number): Builder;
    pattern(value: string | RegExp): Builder;
    format(value: SchemaFormat): Builder;
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
    content(encoding: string, mediaType?: string): Builder;

    array(items?: BuilderItems): Builder;
    items(value: BuilderItems): Builder;
    additionalItems(value: boolean): Builder;
    maxItems(value: number): Builder;
    minItems(value: number): Builder;
    uniqueItems(value: boolean): Builder;
    contains(value: Schema | Builder): Builder;

    object(properties?: BuilderPropertyMap): Builder;
    properties(value: BuilderPropertyMap): Builder;
    maxProperties(value: number): Builder;
    minProperties(value: number): Builder;
    patternProperties(value: BuilderPropertyMap): Builder;
    additionalProperties(value: boolean): Builder;
    propertyNames(value: Schema | Builder): Builder;

    if(value: Schema | Builder): Builder;
    then(value: Schema | Builder): Builder;
    else(value: Schema | Builder): Builder;

    allOf(...values: (Schema | Builder)[]): Builder;
    anyOf(...values: (Schema | Builder)[]): Builder;
    oneOf(...values: (Schema | Builder)[]): Builder;
    not(value: Schema | Builder): Builder;

    nullOrLiteral(value: Primitive): Builder;
    booleanOrNull(): Builder;
    numberOrNull(): Builder;
    integerOrNull(): Builder;
    stringOrNull(): Builder;
    nullOrFormat(value: SchemaFormat): Builder;
    nullOrPattern(value: string | RegExp): Builder;
    nullOrContent(encoding: string, mediaType?: string): Builder;
    dateTimeOrNull(): Builder;
    dateOrNull(): Builder;
    timeOrNull(): Builder;
    emailOrNull(): Builder;
    hostnameOrNull(): Builder;
    ipv4OrNull(): Builder;
    ipv6OrNull(): Builder;
    uriOrNull(): Builder;
    uriReferenceOrNull(): Builder;
    uriTemplateOrNull(): Builder;
    regexOrNull(): Builder;
    nullOrArray(items?: BuilderItems): Builder;
    nullOrObject(properties?: BuilderPropertyMap): Builder;

    positiveNumber(): Builder;
    negativeNumber(): Builder;
    nonNegativeNumber(): Builder;
    positiveInteger(): Builder;
    negativeInteger(): Builder;
    nonNegativeInteger(): Builder;
    nonEmptyString(): Builder;
    nonEmptyArray(): Builder;
    nonEmptyObject(): Builder;
  }

  export interface CheckUtil {
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
    isTypeString(value: any): boolean;
    isFormatString(value: any): boolean;
  }

  export interface BuilderStatic extends PickByType<Builder, Function> {
    (value?: Primitive | BuilderPropertyMap): Builder;
    new (value?: Primitive | BuilderPropertyMap): Builder;
    types: Types;
    formats: Formats;
    check: CheckUtil;
  }
}

declare const Josie: Josie.BuilderStatic;
export = Josie;
