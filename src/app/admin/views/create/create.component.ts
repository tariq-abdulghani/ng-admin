import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableContext, RowContext } from '../../models/ui-contexts';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: TableContext,
    private http: HttpClient
  ) {}

  ctx!: TableContext;

  ngOnInit(): void {
    this.ctx = this.data;
    // console.log(this.data);
  }

  onSave(value?: any) {
    console.log('creating');
    const getLink = this.ctx.links.find((link) => link.type == 'POST');
    const uri = `${getLink?.href}/${getLink?.rel}`;
    this.http
      .post(uri, value)
      .toPromise()
      .then((res) => {
        this.ctx.data?.push(res);
        this.dialogRef.close(value);
      });
    // .catch((errRes) => {
    //   const err = errRes as HttpErrorResponse;
    //   console.log(err);
    //   this.dialogRef.close(err);
    // });
  }
  onCancel(): void {
    this.dialogRef.close(false);
  }
}
