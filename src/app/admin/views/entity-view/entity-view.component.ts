import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntityViewsConfig } from '../../models/entity';
import { EntityViewsRegisterer } from '../../services/entity-registerer';

import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';
import { ConfirmSpecs } from '../../models/confirm-specs';
import { Observable } from 'rxjs';
import { CreateOrUpdateComponent } from '../create-or-update/create-or-update.component';
import { ActionSpec } from '../../models/action-spec';

@Component({
  selector: 'app-entity-view',
  templateUrl: './entity-view.component.html',
  styleUrls: ['./entity-view.component.css'],
})
export class EntityViewComponent implements OnInit {
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private http: HttpClient,
    private activatedRout: ActivatedRoute,
    private entityRegisterer: EntityViewsRegisterer,
    public dialog: MatDialog
  ) {}

  entityViewsConfigId!: string;
  entityViewsConfig!: EntityViewsConfig;
  data: any[] = [];
  displayedColumns: string[] = [];

  ngOnInit(): void {
    this.activatedRout.paramMap.subscribe((res) => {
      // console.log('init.');
      //@ts-ignore
      this.entityViewsConfigId = res!.get('id');
      // console.log(res.get('id'));
      //@ts-ignore
      this.entityViewsConfig =
        this.entityRegisterer.getEntityViewsConfigByLabel(
          this.entityViewsConfigId
        );
      // this.entityViewsConfig.tableView.displayedColumns.push('actions');
      this.init();
      // console.log(this.entityViewsConfig);

      this.http
        .get(this.entityViewsConfig.webService.resourceURI)
        .toPromise()
        .then((res) => {
          this.data = res as any;
          this.dataSource = new MatTableDataSource(this.data);
          this.dataSource.paginator = this.paginator;
        });
    });
  }

  ngAfterViewInit() {}

  getDisplayedColumns() {
    return this.displayedColumns;
  }

  init() {
    this.displayedColumns = Array.from(
      this.entityViewsConfig.tableView.displayedColumns
    );
    this.displayedColumns.push('actions');
  }

  confirm(data: ConfirmSpecs): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '700px',
      data: data,
    });

    return dialogRef.afterClosed();
  }

  onDelete(entity: any) {
    const data: ConfirmSpecs = {
      header: this.entityViewsConfig.label,
      confirmMessage: 'are you sure you want to delete this item?',
      yesLabel: 'yes',
      noLabel: 'no',
    };
    this.confirm(data)
      .toPromise()
      .then((cv) => console.log('confirm ', cv));
  }

  onEdit(element: any) {
    const action: ActionSpec = {
      entityLabel: this.entityViewsConfig.label,
      initialValue: element,
      formEntity: null,
      action: 'update',
    };
    const dialogRef = this.dialog.open(CreateOrUpdateComponent, {
      width: '700px',
      data: action,
    });

    return dialogRef.afterClosed().subscribe((res) => {});
  }

  onNew() {
    const action: ActionSpec = {
      entityLabel: this.entityViewsConfig.label,
      initialValue: null,
      formEntity: null,
      action: 'create',
    };
    const dialogRef = this.dialog.open(CreateOrUpdateComponent, {
      width: '700px',
      data: action,
    });

    return dialogRef.afterClosed().subscribe((res) => {});
  }
}
