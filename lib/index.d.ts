declare namespace josie {
  type PickTypes<Base, T> = Pick<Base, { [K in keyof Base]: Base[K] extends T ? K : never; }[keyof Base]>;

  export type Primitive = boolean | null | number | string;

  export enum TypeString {
    BOOLEAN = 'boolean',
    NULL = 'null',
    NUMBER = 'number',
    INTEGER = 'integer',
    STRING = 'string',
    ARRAY = 'array',
    OBJECT = 'object'
  }

  export enum FormatString {
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
    type?: TypeString | TypeString[];
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
    type(value: TypeString): Builder;
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
    format(value: FormatString): Builder;
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

  export interface BuilderStatic extends PickTypes<Builder, Function> {
    (): Builder;
    types: typeof TypeString;
    formats: typeof FormatString;
  }
}

declare const schema: josie.BuilderStatic;
export = schema;
