import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CREATE,
  DELETE_BY_ID,
  GET_ALL,
  UPDATE_BY_ID,
} from '../decorators/web-resource';
import { TableContext } from '../models/ui-contexts';

// export interface CrudWebService {
//   getAll(uri: string): Promise<any[]>;
//   create(uri: string, body: any): Promise<any>;
//   updateById(uri: string, body: any): Promise<any>;
//   deleteById(uri: string, body: any): Promise<any>;
// }

export interface NgAdminCrudWebService {
  doGetALL(ctx: TableContext): Promise<any[]>;
  doCreate(ctx: TableContext, newVal: any): Promise<any>;
  doUpdateById(ctx: TableContext, newVal: any): Promise<any>;
  doDeleteById(ctx: TableContext, val: any): Promise<any>;
}

@Injectable()
export class DefaultCrudService implements NgAdminCrudWebService {
  constructor(private httpCLient: HttpClient) {}
  doGetALL(ctx: TableContext): Promise<any[]> {
    const endPoint = ctx.endPoints.find((ep) => ep.title == GET_ALL);
    const uri = `${endPoint?.uri}/${endPoint?.uriContext}`;
    return this.httpCLient.get<any[]>(uri).toPromise();
  }
  doCreate(ctx: TableContext, newVal: any): Promise<any> {
    const endPoint = ctx.endPoints.find((ep) => ep.title == CREATE);
    const uri = `${endPoint?.uri}/${endPoint?.uriContext}`;
    return this.httpCLient.post<any>(uri, newVal).toPromise();
  }
  doUpdateById(ctx: TableContext, newVal: any): Promise<any> {
    const endPoint = ctx.endPoints.find((ep) => ep.title == UPDATE_BY_ID);
    const uri = `${endPoint?.uri}/${endPoint?.uriContext}/${
      newVal[ctx.idField || 'id']
    }`;
    return this.httpCLient.put(uri, newVal).toPromise();
  }
  doDeleteById(ctx: TableContext, val: any): Promise<any> {
    const endPoint = ctx.endPoints.find((ep) => ep.title == DELETE_BY_ID);
    const uri = `${endPoint?.uri}/${endPoint?.uriContext}/${
      val[ctx.idField || 'id']
    }`;
    return this.httpCLient.delete(uri).toPromise();
  }
}
