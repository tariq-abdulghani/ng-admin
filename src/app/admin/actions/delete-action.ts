import { HttpClient } from '@angular/common/http';
import { Injectable, Injector, Type } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DELETE_BY_ID, WEB_SERVICE_META_KEY } from '../decorators/web-resource';
import { ConfirmSpecs } from '../models/confirm-specs';
import {
  DefaultCrudService,
  NgAdminCrudWebService,
} from '../services/crud.service';
import { ViewContextService } from '../services/view-context.service';
import { ConfirmComponent } from '../views/confirm/confirm.component';
import { AbstractAction } from './abstract-action';

@Injectable()
export class DeleteAction extends AbstractAction {
  private crudService!: NgAdminCrudWebService;
  constructor(
    ctxService: ViewContextService,
    public dialog: MatDialog,
    private injector: Injector
  ) {
    super(ctxService, '', 'delete');
    console.log(ctxService.getTableContext(), ctxService);
    const webServiceProvider: Type<any> = Reflect.getMetadata(
      WEB_SERVICE_META_KEY,
      ctxService.getTableContext().formEntity.prototype
    );
    console.log('delete action', webServiceProvider);
    if (webServiceProvider) {
      this.crudService = this.injector.get(webServiceProvider);
    } else {
      this.crudService = this.injector.get(DefaultCrudService);
    }
  }

  apply(row?: any) {
    const ctx = this.ctxService.getTableContext();
    const data: ConfirmSpecs = {
      header: this.ctxService.getTableContext().entityLabel,
      confirmMessage: 'are you sure you want to delete this item?',
      yesLabel: 'yes',
      noLabel: 'no',
    };
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '700px',
      height: 'fit-content',
      maxHeight: '80%',
      data: data,
      hasBackdrop: false,
    });

    dialogRef
      .afterClosed()
      .toPromise()
      .then((cv) => {
        if (cv) {
          this.crudService.doDeleteById(ctx, row).then((res) => {
            ctx.data = ctx.data.filter(
              (el) => el[ctx.idField || 'id'] != row[ctx.idField || 'id']
            );
            this.ctxService.setTableContext(ctx, true);
          });
        }
      });
  }
}
