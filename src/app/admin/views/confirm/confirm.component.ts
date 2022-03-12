import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmSpecs } from '../../models/confirm-specs';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
})
export class ConfirmComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmSpecs
  ) {}

  confirmMessage!: string;
  header!: string;
  yesLabel!: string;
  noLabel!: string;

  ngOnInit(): void {
    this.header = this.data.header;
    this.confirmMessage = this.data.confirmMessage;
    this.yesLabel = this.data.yesLabel;
    this.noLabel = this.data.noLabel;
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
