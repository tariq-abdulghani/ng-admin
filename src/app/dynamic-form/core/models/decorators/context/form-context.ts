import 'reflect-metadata';

export type UseContext = 'CREATE' | 'UPDATE' | 'NONE' | 'SEARCH' | 'PATCH';
export const ID_META_KEY = Symbol('Id');
export const ON_UPDATE_META_KEY = Symbol('OnUpdate');

export type IdSpecs = {
  generate: 'INPUT' | 'SERVER'; // if input input will appear when form is used to create the entity else will not appear
  //   update: 'INPUT' | 'READ_ONLY';
};

export type OverridableProperties = {
  readonly?: boolean;
  disables?: boolean;
  class?: string;
  [x: string]: any;
};

export function UpdateOverride(specs: OverridableProperties) {
  return function (target: any, propertyKey: string) {
    Reflect.defineMetadata(ON_UPDATE_META_KEY, specs, target, propertyKey);
  };
}

export function Id(specs: IdSpecs) {
  return function (target: any, propertyKey: string) {
    // console.log('target id', target);
    Reflect.defineMetadata(ID_META_KEY, propertyKey, target);
    Reflect.defineMetadata(ID_META_KEY, specs, target, propertyKey);
  };
}
