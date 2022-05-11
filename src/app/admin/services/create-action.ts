import { HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TableContext } from '../models/ui-contexts';
import { CreateComponent } from '../views/create/create.component';
import { AbstractAction } from './abstract-action';
import { ViewContextService } from './view-context.service';

@Injectable()
export class CreateAction extends AbstractAction {
  constructor(ctxService: ViewContextService, public dialog: MatDialog) {
    super(ctxService, '', 'add');
  }

  apply() {
    const ctx = this.ctxService.getTableContext();
    const dialogRef = this.dialog.open(CreateComponent, {
      width: '80%',
      height: 'fit-content',
      maxHeight: '80%',
      hasBackdrop: false,
      data: ctx,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res && !(res instanceof HttpErrorResponse)) {
        // ctx.data.push(res);
        this.ctxService.setTableContext(ctx, true);
      }
    });
  }
}
