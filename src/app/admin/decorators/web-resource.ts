import { Type } from '@angular/core';
import { NgAdminCrudWebService } from '../services/crud.service';

export const WEB_RESOURCE_META_KEY = Symbol('WebResource');
export const GET_ALL = Symbol('getAll');
export const CREATE = Symbol('create');
export const UPDATE_BY_ID = Symbol('update by id');
export const DELETE_BY_ID = Symbol('delete by id');

export type CrudLink = {
  href?: string;
  rel: string;
  type: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
};
export type WebResourceSpec = {
  name: string;
  endPoints: EndPoint[];
  provider?: Type<NgAdminCrudWebService>;
};

export function WebResource(specs: WebResourceSpec) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    Reflect.defineMetadata(WEB_RESOURCE_META_KEY, specs, constructor.prototype);
    return class extends constructor {};
  };
}

export type EndPoint = {
  title: string | Symbol;
  description?: string;
  uri: string;
  uriContext: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
};

export class EndPoints {
  public static of(endPoints: EndPoint[]) {
    return new EndPoints(endPoints);
  }

  private constructor(private endPoints: EndPoint[]) {}

  getEndPoint(action: string): EndPoint | undefined {
    return this.endPoints.find((ep) => ep.title == action);
  }
}
