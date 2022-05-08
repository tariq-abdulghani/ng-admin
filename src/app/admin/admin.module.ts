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
import { CreateOrUpdateComponent } from './views/create-or-update/create-or-update.component';

import { MatCardModule } from '@angular/material/card';
import { UpdateComponent } from './views/update/update.component';
import { DecoratorDrivenDynamicFormsModule } from '../dynamic-form/decorator-driven-dynamic-forms.module';
import { CreateComponent } from './views/create/create.component';

@NgModule({
  declarations: [
    EntityViewComponent,
    ConfirmComponent,
    CreateOrUpdateComponent,
    UpdateComponent,
    CreateComponent,
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
    DecoratorDrivenDynamicFormsModule,
  ],
})
export class AdminModule {}
