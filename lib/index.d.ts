/*
 * Type Definitions for Josie Schema
 * https://github.com/aravindanve
 *
 * based on json-schema/draft-07
 * see SUPPORT.md for additional information
 *
 */

type PickByType<Base, T> = Pick<Base, { [K in keyof Base]: Base[K] extends T ? K : never; }[keyof Base]>;

declare namespace Josie {
  export type Type = 'null' | 'boolean' | 'number' | 'integer' | 'string' | 'array' | 'object';
  export type Format = 'date-time' | 'date' | 'time' | 'email' | 'hostname' | 'ipv4' | 'ipv6' |
    'uri' | 'uri-reference' | 'uri-template' | 'regex';

  export type Schema = boolean | SchemaObject;

  export interface SchemaObject {
    type?: Type | Type[];
    enum?: [any];
    const?: any;
    default?: any;

    multipeOf?: number;
    maximum?: number;
    exclusiveMaximum?: number;
    minimum?: number;
    exclusiveMinimum?: number;

    maxLength?: number;
    minLength?: number;
    pattern?: string;
    format?: Format;

    items?: Schema | Schema[];
    additionalItems?: Schema;
    maxItems?: number;
    minItems?: number;
    uniqueItems?: boolean;
    contains?: Schema;

    maxProperties?: number;
    minProperties?: number;
    required?: string[];
    properties?: { [name: string]: Schema; };
    patternProperties?: { [name: string]: Schema; };
    additionalProperties?: Schema;
    propertyNames?: Schema;

    if?: Schema;
    then?: Schema;
    else?: Schema;

    allOf?: [Schema];
    anyOf?: [Schema];
    oneOf?: [Schema];
    not?: Schema;
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
    HOSTNAME: 'hostname';
    IPV4: 'ipv4';
    IPV6: 'ipv6';
    URI: 'uri';
    URI_REFERENCE: 'uri-reference';
    URI_TEMPLATE: 'uri-template';
    REGEX: 'regex';
  }

  export type BuilderOrSchema = Builder | Schema;
  export type BuilderOrSchemaItems = BuilderOrSchema | BuilderOrSchema[];
  export type BuilderProperties = { [name: string]: BuilderOrSchema };

  export interface Builder {
    type(value: Type, ...more: Type[]): Builder;
    hasType(...values: Type[]): boolean;

    enum(value: any, ...more: any[]): Builder;
    const(value: any): Builder;
    default(value: any): Builder;

    literal(value: any): Builder;

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
    format(value: Format): Builder;
    dateTime(): Builder;
    date(): Builder;
    time(): Builder;
    email(): Builder;
    hostname(): Builder;
    ipv4(): Builder;
    ipv6(): Builder;
    uri(): Builder;
    uriReference(): Builder;
    uriTemplate(): Builder;
    regex(): Builder;

    array(items?: BuilderOrSchemaItems): Builder;
    items(value: BuilderOrSchemaItems): Builder;
    additionalItems(value: BuilderOrSchema): Builder;
    maxItems(value: number): Builder;
    minItems(value: number): Builder;
    uniqueItems(value: boolean): Builder;
    contains(value: BuilderOrSchema): Builder;

    object(properties?: BuilderProperties): Builder;
    maxProperties(value: number): Builder;
    minProperties(value: number): Builder;
    properties(value: BuilderProperties): Builder;
    patternProperties(value: BuilderProperties): Builder;
    additionalProperties(value: BuilderOrSchema): Builder;
    propertyNames(value: BuilderOrSchema): Builder;

    if(value: BuilderOrSchema): Builder;
    then(value: BuilderOrSchema): Builder;
    else(value: BuilderOrSchema): Builder;

    allOf(...values: BuilderOrSchema[]): Builder;
    anyOf(...values: BuilderOrSchema[]): Builder;
    oneOf(...values: BuilderOrSchema[]): Builder;
    not(value: BuilderOrSchema): Builder;

    nullOrLiteral(value: any): Builder;
    nullOrBoolean(): Builder;
    nullOrNumber(): Builder;
    nullOrInteger(): Builder;
    nullOrString(): Builder;
    nullOrFormat(value: Format): Builder;
    nullOrPattern(value: string | RegExp): Builder;
    nullOrDateTime(): Builder;
    nullOrDate(): Builder;
    nullOrTime(): Builder;
    nullOrEmail(): Builder;
    nullOrHostname(): Builder;
    nullOrIpv4(): Builder;
    nullOrIpv6(): Builder;
    nullOrUri(): Builder;
    nullOrUriReference(): Builder;
    nullOrUriTemplate(): Builder;
    nullOrRegex(): Builder;
    nullOrArray(items?: BuilderOrSchemaItems): Builder;
    nullOrObject(properties?: BuilderProperties): Builder;

    numberPositive(): Builder;
    numberNegative(): Builder;
    numberNonNegative(): Builder;
    integerPositive(): Builder;
    integerNegative(): Builder;
    integerNonNegative(): Builder;
    stringNonEmpty(): Builder;
    arrayNonEmpty(): Builder;
    objectNonEmpty(): Builder;
  }

  export interface Check {
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
    (properties?: BuilderProperties): Builder;
    new (value?: BuilderProperties): Builder;
    types: Types;
    formats: Formats;
    check: Check;
  }
}

declare const Josie: Josie.BuilderStatic;
export = Josie;
