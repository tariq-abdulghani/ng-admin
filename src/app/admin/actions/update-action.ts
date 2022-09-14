import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewContextService } from '../services/view-context.service';
import { UpdateComponent } from '../views/update/update.component';
import { AbstractAction } from './abstract-action';

@Injectable()
export class UpdateAction extends AbstractAction {
  constructor(ctxService: ViewContextService, public dialog: MatDialog) {
    super(ctxService, '', 'create');
  }

  apply(row?: any) {
    const ctx = this.ctxService.getRowContext(row);
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '80%',
      height: 'fit-content',
      maxHeight: '80%',
      hasBackdrop: false,
      data: ctx,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res && !(res instanceof HttpErrorResponse)) {
        // todo make sure to make the retuen really expresses the table context
        const rowToUpdate = ctx.data.find(
          (el) => el[ctx.idField || 'id'] == res[ctx.idField || 'id']
        );
        this.updateObjByObj(res, rowToUpdate);
        this.ctxService.setTableContext(ctx, true);
      }
    });
  }

  private updateObjByObj(
    source: { [x: string]: any },
    target: { [x: string]: any }
  ) {
    Object.entries(target).forEach(([key, value]) => {
      if (Object.keys(source).includes(key)) {
        target[key] = source[key];
      }
    });
  }
}
