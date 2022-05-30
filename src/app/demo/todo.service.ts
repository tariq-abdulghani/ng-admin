import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  GET_ALL,
  CREATE,
  UPDATE_BY_ID,
  DELETE_BY_ID,
} from '../admin/decorators/web-resource';
import { TableContext } from '../admin/models/ui-contexts';
import { NgAdminCrudWebService } from '../admin/services/crud.service';

@Injectable()
export class ToDoService implements NgAdminCrudWebService {
  constructor(private httpCLient: HttpClient) {
    console.log('todo service impl ');
  }
  doGetALL(ctx: TableContext): Promise<any[]> {
    console.log('todo service impl ');
    const endPoint = ctx.endPoints.find((ep) => ep.title == GET_ALL);
    const uri = `${endPoint?.uri}/${endPoint?.uriContext}`;
    return this.httpCLient.get<any[]>(uri).toPromise();
  }
  doCreate(ctx: TableContext, newVal: any): Promise<any> {
    console.log('create from todo service impl');
    const endPoint = ctx.endPoints.find((ep) => ep.title == CREATE);
    const uri = `${endPoint?.uri}/${endPoint?.uriContext}`;
    return this.httpCLient.post<any>(uri, newVal).toPromise();
  }
  doUpdateById(ctx: TableContext, newVal: any): Promise<any> {
    console.log('update by id from todo service impl');
    const endPoint = ctx.endPoints.find((ep) => ep.title == UPDATE_BY_ID);
    const uri = `${endPoint?.uri}/${endPoint?.uriContext}/${
      newVal[ctx.idField || 'id']
    }`;
    return this.httpCLient.put(uri, newVal).toPromise();
  }
  doDeleteById(ctx: TableContext, val: any): Promise<any> {
    console.log('delete by id from todo service impl');
    const endPoint = ctx.endPoints.find((ep) => ep.title == DELETE_BY_ID);
    const uri = `${endPoint?.uri}/${endPoint?.uriContext}/${
      val[ctx.idField || 'id']
    }`;
    return this.httpCLient.delete(uri).toPromise();
  }
}
