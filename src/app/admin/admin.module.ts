import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityViewsConfig } from './models/entity';
import { EntityViewsRegisterer } from './services/entity-registerer';
import { AdminBoardComponent } from './views/admin-board/admin-board.component';
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

@NgModule({
  declarations: [
    AdminBoardComponent,
    EntityViewComponent,
    ConfirmComponent,
    CreateOrUpdateComponent,
  ],
  exports: [AdminBoardComponent],
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
  ],
})
export class AdminModule {
  static forRoot(
    config: EntityViewsConfig[]
  ): ModuleWithProviders<AdminModule> {
    return {
      ngModule: AdminModule,
      providers: [
        {
          provide: EntityViewsRegisterer,
          useFactory: () => {
            return new EntityViewsRegisterer(config);
          },
        },
      ],
    };
  }
}
