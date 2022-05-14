/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./src/context"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  ProjectOrderByInput: { // input type
    createdAt?: NexusGenEnums['Sort'] | null; // Sort
    description?: NexusGenEnums['Sort'] | null; // Sort
    title?: NexusGenEnums['Sort'] | null; // Sort
  }
}

export interface NexusGenEnums {
  Sort: "asc" | "desc"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  AuthPayload: { // root type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Mutation: {};
  Project: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    description: string; // String!
    examples?: Array<string | null> | null; // [String]
    id: number; // Int!
    stories?: Array<string | null> | null; // [String]
    title: string; // String!
  }
  ProjectList: { // root type
    count: number; // Int!
    id?: string | null; // ID
    projects: NexusGenRootTypes['Project'][]; // [Project!]!
  }
  Query: {};
  User: { // root type
    email: string; // String!
    id: number; // Int!
    name: string; // String!
  }
  Vote: { // root type
    project: NexusGenRootTypes['Project']; // Project!
    user: NexusGenRootTypes['User']; // User!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  AuthPayload: { // field return type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Mutation: { // field return type
    add: NexusGenRootTypes['Project']; // Project!
    login: NexusGenRootTypes['AuthPayload']; // AuthPayload!
    signup: NexusGenRootTypes['AuthPayload']; // AuthPayload!
    vote: NexusGenRootTypes['Vote'] | null; // Vote
  }
  Project: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    description: string; // String!
    examples: Array<string | null> | null; // [String]
    id: number; // Int!
    postedBy: NexusGenRootTypes['User'] | null; // User
    stories: Array<string | null> | null; // [String]
    title: string; // String!
    voters: NexusGenRootTypes['User'][]; // [User!]!
  }
  ProjectList: { // field return type
    count: number; // Int!
    id: string | null; // ID
    projects: NexusGenRootTypes['Project'][]; // [Project!]!
  }
  Query: { // field return type
    allProjects: NexusGenRootTypes['ProjectList']; // ProjectList!
  }
  User: { // field return type
    email: string; // String!
    id: number; // Int!
    name: string; // String!
    projects: NexusGenRootTypes['Project'][]; // [Project!]!
    votes: NexusGenRootTypes['Project'][]; // [Project!]!
  }
  Vote: { // field return type
    project: NexusGenRootTypes['Project']; // Project!
    user: NexusGenRootTypes['User']; // User!
  }
}

export interface NexusGenFieldTypeNames {
  AuthPayload: { // field return type name
    token: 'String'
    user: 'User'
  }
  Mutation: { // field return type name
    add: 'Project'
    login: 'AuthPayload'
    signup: 'AuthPayload'
    vote: 'Vote'
  }
  Project: { // field return type name
    createdAt: 'DateTime'
    description: 'String'
    examples: 'String'
    id: 'Int'
    postedBy: 'User'
    stories: 'String'
    title: 'String'
    voters: 'User'
  }
  ProjectList: { // field return type name
    count: 'Int'
    id: 'ID'
    projects: 'Project'
  }
  Query: { // field return type name
    allProjects: 'ProjectList'
  }
  User: { // field return type name
    email: 'String'
    id: 'Int'
    name: 'String'
    projects: 'Project'
    votes: 'Project'
  }
  Vote: { // field return type name
    project: 'Project'
    user: 'User'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    add: { // args
      description: string; // String!
      title: string; // String!
    }
    login: { // args
      email: string; // String!
      password: string; // String!
    }
    signup: { // args
      email: string; // String!
      name: string; // String!
      password: string; // String!
    }
    vote: { // args
      projectId: number; // Int!
    }
  }
  Query: {
    allProjects: { // args
      filter?: string | null; // String
      orderBy?: NexusGenInputs['ProjectOrderByInput'][] | null; // [ProjectOrderByInput!]
      skip?: number | null; // Int
      take?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}