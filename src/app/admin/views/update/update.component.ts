import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RowContext } from '../../models/action-spec';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: RowContext,
    private http: HttpClient
  ) {}

  ctx!: RowContext;

  ngOnInit(): void {
    this.ctx = this.data;
    // console.log(this.data);
  }

  onSave(value?: any) {
    console.log('saving');
    const getLink = this.ctx.links.find((link) => link.type == 'PUT');
    const uri = `${getLink?.href}/${getLink?.rel}/${
      value[this.ctx.idField || 'id']
    }`;
    this.http
      .put(uri, value)
      .toPromise()
      .then((res) => {
        this.dialogRef.close(value);
      });
  }
  onCancel(): void {
    this.dialogRef.close(false);
  }
}
