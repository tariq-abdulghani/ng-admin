import {
  NoopScrollStrategy,
  ScrollStrategyOptions,
} from '@angular/cdk/overlay';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdateComponent } from '../views/update/update.component';
import { AbstractAction } from './abstract-action';
import { ViewContextService } from './view-context.service';

@Injectable()
export class UpdateAction extends AbstractAction {
  constructor(ctxService: ViewContextService, public dialog: MatDialog) {
    super(ctxService, '', 'create');
  }

  apply(row?: any) {
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '80%',
      height: 'fit-content',
      maxHeight: '80%',
      hasBackdrop: false,
      data: this.ctxService.getRowContext(row),
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res && !(res instanceof HttpErrorResponse)) {
        // todo make sure to make the retuen really expresses the table context
        this.ctxService.setTableContext(
          this.ctxService.getTableContext(),
          true
        );
      }
    });
  }
}
