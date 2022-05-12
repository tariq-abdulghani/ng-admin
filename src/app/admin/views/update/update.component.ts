import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RowContext } from '../../models/ui-contexts';
import { DefaultCrudService } from '../../services/crud.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  ctx!: RowContext;
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: RowContext,
    private crudService: DefaultCrudService
  ) {}

  ngOnInit(): void {
    this.ctx = this.data;
  }

  onSave(value?: any) {
    this.crudService.doUpdateById(this.ctx, value).then((res) => {
      this.dialogRef.close(value);
    });
  }
  onCancel(): void {
    this.dialogRef.close(false);
  }
}
