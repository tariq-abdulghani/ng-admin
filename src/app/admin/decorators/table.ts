import { Type } from '@angular/core';
import { AbstractAction } from '../services/abstract-action';

export const TABLE_META_KEY = Symbol('WebResource');
export type Pagination = {
  async: boolean;
  pageSize: number;
};
export type DynamicTableModel = {
  columns: ColumnSpec[];
  pagination?: Pagination;
  menuBar?: AbstractAction[];
  actions?: AbstractAction[];
  rowNgClass?: (row: any) => { [x: string]: boolean };
};

export type TableSpec = {
  columns: ColumnSpec[];
  pagination?: Pagination;
  menuBar?: Type<AbstractAction>[];
  actions?: Type<AbstractAction>[];
  rowNgClass?: (row: any) => { [x: string]: boolean };
};

export type ColumnSpec = {
  key: string;
  displayName: string;
  type:
    | 'string'
    | 'Date'
    | 'number'
    | 'currency'
    | 'object'
    | 'action'
    | 'img'
    | 'boolean';
  options?: { format?: string; objectToString: (obj: any) => string };
};

export function Table(specs: TableSpec) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    Reflect.defineMetadata(TABLE_META_KEY, specs, constructor.prototype);
    return class extends constructor {};
  };
}
