import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DELETE_BY_ID } from '../decorators/web-resource';
import { ConfirmSpecs } from '../models/confirm-specs';
import { ConfirmComponent } from '../views/confirm/confirm.component';
import { AbstractAction } from './abstract-action';
import { DefaultCrudService } from './crud.service';
import { ViewContextService } from './view-context.service';

@Injectable()
export class DeleteAction extends AbstractAction {
  constructor(
    ctxService: ViewContextService,
    public dialog: MatDialog,
    private crudService: DefaultCrudService
  ) {
    super(ctxService, '', 'delete');
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
