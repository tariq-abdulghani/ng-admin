import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableContext } from '../../models/ui-contexts';
import { DefaultCrudService } from '../../services/crud.service';
export const TABLE_CONTEXT = new InjectionToken<TableContext>('table context');

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  ctx!: TableContext;
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: TableContext,
    private crudService: DefaultCrudService
  ) {}

  ngOnInit(): void {
    this.ctx = this.data;
  }

  onSave(value?: any) {
    console.log('creating');
    this.crudService
      .doCreate(this.ctx, value)
      .then((res) => {
        this.ctx.data?.push(res);
        this.dialogRef.close(res);
      })
      .catch((errRes) => {
        const err = errRes as HttpErrorResponse;
        console.log(err);
        this.dialogRef.close(err);
      });
  }
  onCancel(): void {
    this.dialogRef.close(false);
  }
}
