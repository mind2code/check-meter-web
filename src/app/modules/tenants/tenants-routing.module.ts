import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenantsComponent } from './tenants.component';
import { TenantEditComponent } from './edit/edit.component';
import { TenantCreateComponent } from './create/create.component';

const routes: Routes = [
  {
    path: '',
    component: TenantsComponent,
  },
  {
    path: 'create',
    component: TenantCreateComponent,
  },
  {
    path: ':tenantId/edit',
    component: TenantEditComponent,
  },
  {
    path: ':tenantId/view',
    loadChildren: () => import('./view/view.module').then(m => m.TenantViewModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantsRoutingModule { }
