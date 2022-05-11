import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  data: any[] = [];
  entityName!: string;
  links: CrudLink[] = [];
  tableSpec!: TableSpec;
  entityClass!: Type<any>;
  idField!: string;

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

  ngOnInit(): void {
    this.activatedRout.paramMap.subscribe((res) => {
      this.init(res.get('id'));
    });
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

    if (entityClass) {
      this.entityClass = entityClass;
      const resourceSpec: WebResourceSpec = Reflect.getMetadata(
        WEB_RESOURCE_META_KEY,
        entityClass.prototype
      );
      resourceSpec?.links.forEach((link) => {
        this.links.push(link);
      });

      const tableSpec: TableSpec = Reflect.getMetadata(
        TABLE_META_KEY,
        entityClass.prototype
      );
      this.tableSpec = tableSpec;

      tableSpec.menuBar = [this.createAction];
      tableSpec.actions = [this.updateAction, this.deleteAction];

      this.idField = Reflect.getMetadata(ID_META_KEY, this.entityClass) || 'id';
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
      })
      .then((_) => {
        const ctx: TableContext = {
          entityLabel: this.entityName,
          formEntity: this.entityClass,
          links: this.links,
          idField: this.idField,
          data: this.data,
        };
        this.viewCtxService.setTableContext(ctx);
        this.viewCtxService.contextChanges().subscribe((ctx) => {
          console.log('ctx changed', ctx);
          this.data = ctx.data;
        });
      });
  }
}
