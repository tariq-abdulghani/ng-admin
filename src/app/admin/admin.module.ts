import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityViewComponent } from './views/entity-view/entity-view.component';
import { RouterModule } from '@angular/router';
import { adminRoutes } from './admin-routes';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';

import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmComponent } from './views/confirm/confirm.component';

import { MatCardModule } from '@angular/material/card';
import { UpdateComponent } from './views/update/update.component';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { CreateComponent } from './views/create/create.component';
import { DynamicCrudTableComponent } from './views/dynamic-crud-table/dynamic-crud-table.component';
import { DefaultCrudService } from './services/crud.service';
import { ToDoService } from '../demo/todo.service';

@NgModule({
  declarations: [
    EntityViewComponent,
    ConfirmComponent,
    UpdateComponent,
    CreateComponent,
    DynamicCrudTableComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes),
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule,
    DynamicFormModule,
  ],
  providers: [DefaultCrudService, ToDoService],
})
export class AdminModule {}
