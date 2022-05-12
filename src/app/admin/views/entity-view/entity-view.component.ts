import { HttpClient } from '@angular/common/http';
import { Component, Injector, OnDestroy, OnInit, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { EntityRegistry } from 'src/app/dynamic-form/core/services/entity-registry/entity-registry.service';
import {
  EndPoint,
  GET_ALL,
  WebResourceSpec,
  WEB_RESOURCE_META_KEY,
} from '../../decorators/web-resource';
import {
  DynamicTableModel,
  TableSpec,
  TABLE_META_KEY,
} from '../../decorators/table';
import { Nullable } from '../../utils/nullable';
import { TableContext } from '../../models/ui-contexts';
import { ID_META_KEY } from 'src/app/dynamic-form/core/models/decorators/context/form-context';
import { ViewContextService } from '../../services/view-context.service';
import { CreateAction } from '../../services/create-action';
import { UpdateAction } from '../../services/update-action';
import { DeleteAction } from '../../services/delete-action';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-entity-view',
  templateUrl: './entity-view.component.html',
  styleUrls: ['./entity-view.component.css'],
  providers: [ViewContextService, CreateAction, UpdateAction, DeleteAction],
})
export class EntityViewComponent implements OnInit, OnDestroy {
  data: any[] = [];
  entityName!: string;
  endPoints: EndPoint[] = [];
  tableModel!: DynamicTableModel;
  entityClass!: Type<any>;
  idField!: string;
  contextChangeSubscription!: Subscription;
  constructor(
    private http: HttpClient,
    private activatedRout: ActivatedRoute,
    private injector: Injector,
    private entityRegistry: EntityRegistry,
    public dialog: MatDialog,
    private viewCtxService: ViewContextService // public createAction: CreateAction, // public updateAction: UpdateAction, // public deleteAction: DeleteAction
  ) {}

  ngOnInit(): void {
    this.activatedRout.paramMap.subscribe((res) => {
      this.init(res.get('id'));
    });
  }

  ngOnDestroy(): void {
    this.contextChangeSubscription.unsubscribe();
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
      resourceSpec?.endPoints.forEach((endPoint) => {
        this.endPoints.push(endPoint);
      });

      const tableSpec: TableSpec = Reflect.getMetadata(
        TABLE_META_KEY,
        entityClass.prototype
      );

      this.getTableModel(tableSpec);

      this.idField = Reflect.getMetadata(ID_META_KEY, this.entityClass) || 'id';
      this.loadData();
    }
  }

  loadData() {
    const endPoint = this.endPoints.find((ep) => ep.title == GET_ALL);
    const uri = `${endPoint?.uri}/${endPoint?.uriContext}`;
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
          endPoints: this.endPoints,
          idField: this.idField,
          data: this.data,
        };
        this.viewCtxService.setTableContext(ctx);
        if (!this.contextChangeSubscription) {
          this.contextChangeSubscription = this.viewCtxService
            .contextChanges()
            .subscribe((ctx) => {
              console.log('ctx changed', ctx);
              // console.log(this.data == ctx.data);
              if (this.data == ctx.data) {
                this.data = Array.of(...ctx.data);
              } else {
                this.data = ctx.data;
              }
            });
        }
      });
  }

  getTableModel(specs: TableSpec) {
    const tableModel: DynamicTableModel = {
      columns: specs.columns,
      actions: [],
      menuBar: [],
    };

    if (specs.menuBar) {
      specs.menuBar.forEach((menuItemClass) =>
        tableModel.menuBar?.push(this.injector.get(menuItemClass))
      );
    } else {
      tableModel.menuBar?.push(this.injector.get(CreateAction));
    }

    if (specs.actions) {
      specs.actions.forEach((actionClass) =>
        tableModel.actions?.push(this.injector.get(actionClass))
      );
    } else {
      tableModel.actions?.push(this.injector.get(UpdateAction));
      tableModel.actions?.push(this.injector.get(DeleteAction));
    }
    this.tableModel = tableModel;
  }
}
