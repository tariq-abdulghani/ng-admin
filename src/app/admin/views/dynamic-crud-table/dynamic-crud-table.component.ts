import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DynamicTableModel } from '../../decorators/table';

@Component({
  selector: 'mat-d-crud-table',
  templateUrl: './dynamic-crud-table.component.html',
  styleUrls: ['./dynamic-crud-table.component.css'],
})
export class DynamicCrudTableComponent implements OnInit, OnChanges {
  @Input() tableModel!: DynamicTableModel;
  @Input() data: any[] = [];
  @Input() title!: string;
  displayedColumns: string[] = [];

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {}

  ngOnInit(): void {
    this.displayedColumns = Array.of(
      ...this.tableModel.columns.map((col) => col.key)
    );
    if (!this.tableModel.actions || this.tableModel.actions.length > 0) {
      this.displayedColumns.push('actions');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      // console.log('data changed,', this.data, changes.data.currentValue);
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
    }
  }

  getDisplayedColumns() {
    return this.displayedColumns;
  }
}
