import { Routes } from '@angular/router';
import { EntityViewComponent } from './views/entity-view/entity-view.component';

export const adminRoutes: Routes = [
  { path: 'admin/:id', component: EntityViewComponent },
];
