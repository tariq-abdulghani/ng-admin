import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  Inject,
  InjectionToken,
  Injector,
  OnInit,
  Type,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WEB_SERVICE_META_KEY } from '../../decorators/web-resource';
import { TableContext } from '../../models/ui-contexts';
import {
  DefaultCrudService,
  NgAdminCrudWebService,
} from '../../services/crud.service';
export const TABLE_CONTEXT = new InjectionToken<TableContext>('table context');

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  ctx!: TableContext;
  private crudService!: NgAdminCrudWebService;
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: TableContext,
    private injector: Injector
  ) {}

  ngOnInit(): void {
    this.ctx = this.data;
    const webServiceProvider: Type<any> = Reflect.getMetadata(
      WEB_SERVICE_META_KEY,
      this.ctx.formEntity.prototype
    );
    console.log('we', webServiceProvider, this.ctx);
    if (webServiceProvider) {
      this.crudService = this.injector.get(webServiceProvider);
    } else {
      this.crudService = this.injector.get(DefaultCrudService);
    }
  }

  onSave(value?: any) {
    console.log('creating');
    this.crudService
      .doCreate(this.ctx, value)
      .then((res) => {
        this.ctx.data?.push(res);
        this.dialogRef.close(res);
      })
      .catch((errRes) => {
        const err = errRes as HttpErrorResponse;
        console.log(err);
        this.dialogRef.close(err);
      });
  }
  onCancel(): void {
    this.dialogRef.close(false);
  }
}
