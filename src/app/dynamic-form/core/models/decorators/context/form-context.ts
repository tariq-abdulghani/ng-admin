import 'reflect-metadata';

export type UseContext =
  | 'CREATE'
  | 'UPDATE'
  | 'NONE'
  | 'SEARCH'
  | 'PATCH'
  | string;
export const ID_META_KEY = Symbol('Id');

export const USE_CONTEXT_META_KEY = Symbol('USE_CONTEXT_META');

export type OverridableProperties = {
  readonly?: boolean;
  disables?: boolean;
  class?: string;
  [x: string]: any;
};

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
