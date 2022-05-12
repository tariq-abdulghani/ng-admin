import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UPDATE_BY_ID } from '../../decorators/web-resource';
import { RowContext } from '../../models/ui-contexts';

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
    const endPoint = this.ctx.endPoints.find((ep) => ep.title == UPDATE_BY_ID);
    const uri = `${endPoint?.uri}/${endPoint?.uriContext}/${
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
