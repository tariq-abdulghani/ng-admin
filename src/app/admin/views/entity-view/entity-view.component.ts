import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';
import { ConfirmSpecs } from '../../models/confirm-specs';
import { Observable } from 'rxjs';
import { EntityRegistry } from 'src/app/dynamic-form/core/services/entity-registry/entity-registry.service';
import {
  CrudLink,
  WebResourceSpec,
  WEB_RESOURCE_META_KEY,
} from '../../decorators/web-resource';
import { TableSpec, TABLE_META_KEY } from '../../decorators/table';
import { Nullable } from '../../utils/nullable';
import { TableContext, RowContext } from '../../models/ui-contexts';
import { UpdateComponent } from '../update/update.component';
import { ID_META_KEY } from 'src/app/dynamic-form/core/models/decorators/context/form-context';
import { CreateComponent } from '../create/create.component';

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
    private entityRegistry: EntityRegistry,
    public dialog: MatDialog
  ) {}

  data: any[] = [];
  displayedColumns: string[] = [];
  entityName!: string;
  links: CrudLink[] = [];
  tableSpec!: TableSpec;
  entityClass!: Type<any>;

  ngOnInit(): void {
    this.activatedRout.paramMap.subscribe((res) => {
      this.init(res.get('id'));
    });
  }

  ngAfterViewInit() {}

  getDisplayedColumns() {
    return this.displayedColumns;
  }

  /**
   *
   * finding entity that has the resource that matches passed param
   * preparing component analyzing links and table config
   * getting data form server
   * more refactor needed
   *
   */
  init(entityName: Nullable<string>) {
    this.entityName = entityName || 'none';
    const entityClass = this.entityRegistry.get(this.entityName);

    console.log(entityClass);

    if (entityClass) {
      this.entityClass = entityClass;
      const resourceSpec: WebResourceSpec = Reflect.getMetadata(
        WEB_RESOURCE_META_KEY,
        entityClass.prototype
      );
      resourceSpec?.links.forEach((link) => {
        this.links.push(link);
      });

      console.log(this.links);

      const tableSpec: TableSpec = Reflect.getMetadata(
        TABLE_META_KEY,
        entityClass.prototype
      );
      this.tableSpec = tableSpec;
      console.log(tableSpec);
      this.displayedColumns = Array.of(
        ...this.tableSpec.columns,
        this.tableSpec.actions ? 'actions' : ''
      );
      this.loadData();
    }
  }

  confirm(data: ConfirmSpecs): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '700px',
      data: data,
    });

    return dialogRef.afterClosed();
  }

  loadData() {
    const getLink = this.links.find((link) => link.type == 'GET');
    const uri = `${getLink?.href}/${getLink?.rel}`;
    this.http
      .get(uri)
      .toPromise()
      .then((res) => {
        this.data = res as any;
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
      });
  }

  onDelete(row: any) {
    const data: ConfirmSpecs = {
      header: this.entityName,
      confirmMessage: 'are you sure you want to delete this item?',
      yesLabel: 'yes',
      noLabel: 'no',
    };
    this.confirm(data)
      .toPromise()
      .then((cv) => {
        if (cv) {
          const getLink = this.links.find((link) => link.type == 'DELETE');
          const uri = `${getLink?.href}/${getLink?.rel}/${
            row[Reflect.getMetadata(ID_META_KEY, this.entityClass) || 'id']
          }`;
          this.http
            .delete(uri)
            .toPromise()
            .then((res) => {
              this.loadData();
            });
        }
      });
  }

  onEdit(row: any) {
    const rowCtx: RowContext = {
      entityLabel: this.entityName,
      row: row,
      formEntity: null,
      links: this.links,
      data: this.data,
      idField: Reflect.getMetadata(ID_META_KEY, this.entityClass),
    };
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '70%',
      height: 'fit-content',
      maxHeight: '80%',
      hasBackdrop: true,
      data: rowCtx,
    });

    return dialogRef.afterClosed().subscribe((res) => {});
  }

  onNew() {
    const ctx: TableContext = {
      entityLabel: this.entityName,
      formEntity: null,
      links: this.links,
      idField: Reflect.getMetadata(ID_META_KEY, this.entityClass),
      data: this.data,
    };
    const dialogRef = this.dialog.open(CreateComponent, {
      width: '70%',
      height: 'fit-content',
      maxHeight: '80%',
      hasBackdrop: true,
      data: ctx,
    });

    return dialogRef.afterClosed().subscribe((res) => {
      // console.log(res, this.data);
      // this.dataSource = new MatTableDataSource(this.data);
      // this.dataSource.paginator = this.paginator;
      if (res && !(res instanceof HttpErrorResponse)) {
        console.log(this.data);
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
      }
    });
  }
}
