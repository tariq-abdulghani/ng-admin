import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntityViewContext, RowContext } from '../../models/action-spec';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: EntityViewContext,
    private http: HttpClient
  ) {}

  ctx!: EntityViewContext;

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
        this.dialogRef.close(value);
      });
  }
  onCancel(): void {
    this.dialogRef.close(false);
  }
}
