import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EntityRegistry } from 'src/app/dynamic-form/core/services/entity-registry/entity-registry.service';
import {
  CrudLink,
  WebResourceSpec,
  WEB_RESOURCE_META_KEY,
} from '../../decorators/web-resource';
import { TableSpec, TABLE_META_KEY } from '../../decorators/table';
import { Nullable } from '../../utils/nullable';
import { TableContext } from '../../models/ui-contexts';
import { ID_META_KEY } from 'src/app/dynamic-form/core/models/decorators/context/form-context';
import { ViewContextService } from '../../services/view-context.service';
import { CreateAction } from '../../services/create-action';
import { UpdateAction } from '../../services/update-action';
import { DeleteAction } from '../../services/delete-action';

@Component({
  selector: 'app-entity-view',
  templateUrl: './entity-view.component.html',
  styleUrls: ['./entity-view.component.css'],
  providers: [ViewContextService, CreateAction, UpdateAction, DeleteAction],
})
export class EntityViewComponent implements OnInit {
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private http: HttpClient,
    private activatedRout: ActivatedRoute,
    private entityRegistry: EntityRegistry,
    public dialog: MatDialog,
    private viewCtxService: ViewContextService,
    public createAction: CreateAction,
    public updateAction: UpdateAction,
    public deleteAction: DeleteAction
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
      this.displayedColumns = Array.of(...this.tableSpec.columns);
      if (!tableSpec.actions || tableSpec.actions.length > 0) {
        this.displayedColumns.push('actions');
      }

      this.loadData();
    }
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
      })
      .then((_) => {
        const ctx: TableContext = {
          entityLabel: this.entityName,
          formEntity: null,
          links: this.links,
          idField: Reflect.getMetadata(ID_META_KEY, this.entityClass),
          data: this.data,
        };
        this.viewCtxService.setTableContext(ctx);
        this.viewCtxService.contextChanges().subscribe((ctx) => {
          console.log('ctx changed', ctx);
        });
      });
  }
}
