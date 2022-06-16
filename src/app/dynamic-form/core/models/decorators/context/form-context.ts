import 'reflect-metadata';

export type UseContext = 'CREATE' | 'UPDATE' | 'NONE' | 'SEARCH' | 'PATCH' | string;
export const ID_META_KEY = Symbol('Id');
export const ON_CONTEXT_META_KEY = Symbol('ON_CONTEXT_META_KEY');
export const USE_CONTEXT_META_KEY = Symbol('USE_CONTEXT_META');

// export type IdSpecs = {
//   generate: 'INPUT' | 'SERVER'; // if input input will appear when form is used to create the entity else will not appear
//   //   update: 'INPUT' | 'READ_ONLY';
// };

export type ContextSpecs = {context: string, properties: OverridableProperties };

export type OverridableProperties = {
  readonly?: boolean;
  disabled?: boolean;
  class?: string;
  [x: string]: any;
};

export function ContextOverride(specs: {context: string, properties: OverridableProperties }) {
  return function (target: any, propertyKey: string) {
    Reflect.defineMetadata(ON_CONTEXT_META_KEY, specs, target, propertyKey);
  };
}

export function Id() {
  return function (target: any, propertyKey: string) {
    // console.log('target id', target);
    Reflect.defineMetadata(ID_META_KEY, propertyKey, target);
  };
}

// todo do it
export function UseContext(ctx: string) {
  return function (target: any, propertyKey: string) {
    Reflect.defineMetadata(USE_CONTEXT_META_KEY, ctx, target, propertyKey);
  };
}
