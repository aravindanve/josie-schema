/*
 * Type Definitions for Josie Schema
 * https://github.com/aravindanve
 *
 */

declare namespace Josie {
  export type Type = 'null' | 'boolean' | 'number' | 'integer' | 'string' | 'array' | 'object';
  export type Schema = boolean | SchemaObject;

  export interface SchemaObject {
    $id?: string;
    $schema?: string;
    $ref?: string;
    $comment?: string;

    title?: string;
    description?: string;
    default?: any;
    readOnly?: boolean;
    examples?: any[];
    dependencies?: { [name: string]: Schema | string[] }

    type?: Type | Type[];
    enum?: [any];
    const?: any;

    multipeOf?: number;
    maximum?: number;
    exclusiveMaximum?: number;
    minimum?: number;
    exclusiveMinimum?: number;

    maxLength?: number;
    minLength?: number;
    pattern?: string;
    format?: string;

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

    contentMediaType?: string;
    contentEncoding?: string;

    if?: Schema;
    then?: Schema;
    else?: Schema;

    allOf?: [Schema];
    anyOf?: [Schema];
    oneOf?: [Schema];
    not?: Schema;
  }

  interface KeywordChain {
    $id(value: string): Builder;
    $schema(value: string): Builder;
    $ref(value: string): Builder;
    $comment(value: string): Builder;

    title(value: string): Builder;
    description(value: string): Builder;
    default(value: any): Builder;
    readOnly(value: boolean): Builder;
    examples(value: any[]): Builder;
    dependencies(value: { [name: string]: Builder | Schema | string[] }): Builder;

    type(value: Type | Type[]): Builder;
    enum(value: [any]): Builder;
    const(value: any): Builder;

    multipeOf(value: number): Builder;
    maximum(value: number): Builder;
    exclusiveMaximum(value: number): Builder;
    minimum(value: number): Builder;
    exclusiveMinimum(value: number): Builder;

    maxLength(value: number): Builder;
    minLength(value: number): Builder;
    pattern(value: string): Builder;
    format(value: string): Builder;

    items(value: Builder | Schema | [Builder | Schema]): Builder;
    additionalItems(value: Builder | Schema): Builder;
    maxItems(value: number): Builder;
    minItems(value: number): Builder;
    uniqueItems(value: boolean): Builder;
    contains(value: Builder | Schema): Builder;

    maxProperties(value: number): Builder;
    minProperties(value: number): Builder;
    required(value: string[]): Builder;
    properties(value: { [name: string]: Builder | Schema; }): Builder;
    patternProperties(value: { [name: string]: Builder | Schema; }): Builder;
    additionalProperties(value: Builder | Schema): Builder;
    propertyNames(value: Builder | Schema): Builder;

    contentMediaType(value: string): Builder;
    contentEncoding(value: string): Builder;

    if(value: Builder | Schema): Builder;
    then(value: Builder | Schema): Builder;
    else(value: Builder | Schema): Builder;

    allOf(value: [Builder | Schema]): Builder;
    anyOf(value: [Builder | Schema]): Builder;
    oneOf(value: [Builder | Schema]): Builder;
    not(value: Builder | Schema): Builder;
  }

  export interface CompiledSchema {
    validate(data: any): void;
    toJSON(): Schema;
  }

  export interface Builder extends KeywordChain {
    toJSON(): Schema;
    export(): Schema;
    compile(): CompiledSchema;
  }

  export interface BuilderStatic extends KeywordChain {
    (schema?: Schema): Builder;
    new (schema?: Schema): Builder;
    compile(): CompiledSchema;
  }
}

declare const Josie: Josie.BuilderStatic;
export = Josie;
