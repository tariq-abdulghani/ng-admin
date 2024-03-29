import { Component, Injector, OnDestroy, OnInit, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { EntityRegistry } from 'src/app/dynamic-form/core/services/entity-registry/entity-registry.service';
import {
  EndPoint,
  WebResourceSpec,
  WEB_RESOURCE_META_KEY,
  WEB_SERVICE_META_KEY,
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
import { CreateAction } from '../../actions/create-action';
import { Subscription } from 'rxjs';
import {
  DefaultCrudService,
  NgAdminCrudWebService,
} from '../../services/crud.service';
import { DeleteAction } from '../../actions/delete-action';
import { UpdateAction } from '../../actions/update-action';

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
  private crudService!: NgAdminCrudWebService;

  constructor(
    private activatedRout: ActivatedRoute,
    private injector: Injector,
    private entityRegistry: EntityRegistry,
    public dialog: MatDialog,
    private viewCtxService: ViewContextService
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
      const ctxInit: TableContext = {
        entityLabel: this.entityName,
        formEntity: entityClass,
        endPoints: this.endPoints,
        idField: this.idField,
        data: this.data,
      };
      this.viewCtxService.setTableContext(ctxInit);

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

      const webServiceProvider: Type<any> = Reflect.getMetadata(
        WEB_SERVICE_META_KEY,
        entityClass.prototype
      );

      if (webServiceProvider) {
        this.crudService = this.injector.get(webServiceProvider);
      } else {
        this.crudService = this.injector.get(DefaultCrudService);
      }
      this.loadData();
    }
  }

  loadData() {
    const ctx: TableContext = {
      entityLabel: this.entityName,
      formEntity: this.entityClass,
      endPoints: this.endPoints,
      idField: this.idField,
      data: this.data,
    };
    this.crudService
      .doGetALL(ctx)
      .then((res) => {
        this.data = res as any;
        ctx.data = res;
      })
      .then((_) => {
        this.viewCtxService.setTableContext(ctx);
        if (!this.contextChangeSubscription) {
          this.contextChangeSubscription = this.viewCtxService
            .contextChanges()
            .subscribe((ctx) => {
              console.log('ctx changed', ctx);
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
