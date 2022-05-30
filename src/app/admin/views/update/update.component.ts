import { Component, Inject, Injector, OnInit, Type } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WEB_SERVICE_META_KEY } from '../../decorators/web-resource';
import { RowContext } from '../../models/ui-contexts';
import {
  DefaultCrudService,
  NgAdminCrudWebService,
} from '../../services/crud.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  ctx!: RowContext;
  private crudService!: NgAdminCrudWebService;
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: RowContext,
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
    this.crudService.doUpdateById(this.ctx, value).then((res) => {
      this.dialogRef.close(value);
    });
  }
  onCancel(): void {
    this.dialogRef.close(false);
  }
}
