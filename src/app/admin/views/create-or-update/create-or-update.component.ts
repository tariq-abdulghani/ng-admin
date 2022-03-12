import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActionSpec } from '../../models/action-spec';

@Component({
  selector: 'app-create-or-update',
  templateUrl: './create-or-update.component.html',
  styleUrls: ['./create-or-update.component.css'],
})
export class CreateOrUpdateComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: ActionSpec
  ) {}

  actionSpec!: ActionSpec;

  ngOnInit(): void {
    this.actionSpec = this.data;
    // console.log(this.data);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
