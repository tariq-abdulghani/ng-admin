import { AbstractAction } from '../services/abstract-action';

export const TABLE_META_KEY = Symbol('WebResource');
export type Pagination = {
  async: boolean;
  pageSize: number;
};
export type TableSpec = {
  columns: string[];
  pagination?: Pagination;
  menuBar?: AbstractAction[];
  actions?: AbstractAction[];
};

export function Table(specs: TableSpec) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    Reflect.defineMetadata(TABLE_META_KEY, specs, constructor.prototype);
    return class extends constructor {};
  };
}
