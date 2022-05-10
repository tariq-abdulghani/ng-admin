import { HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TableContext } from '../models/ui-contexts';
import { CreateComponent } from '../views/create/create.component';
import { AbsctractAction } from './absctract-action';
import { ViewContextService } from './view-context.service';

@Injectable()
export class CreateAction extends AbsctractAction {
  constructor(ctxService: ViewContextService, public dialog: MatDialog) {
    super(ctxService, '', 'add');
  }

  apply() {
    const dialogRef = this.dialog.open(CreateComponent, {
      width: '70%',
      height: 'fit-content',
      maxHeight: '80%',
      hasBackdrop: false,
      data: this.ctxService.getTableContext(),
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res && !(res instanceof HttpErrorResponse)) {
        this.ctxService.setTableContext(
          this.ctxService.getTableContext(),
          true
        );
      }
    });
  }
}
