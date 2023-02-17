import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenantViewOverviewComponent } from './overview/overview.component';
import { TenantViewComponent } from './view.component';
import { TenantViewExpiryNoticesComponent } from './expiry-notices/expiry-notices.component';

const routes: Routes = [
  {
    path: '',
    component: TenantViewComponent,
    children: [
      { path: 'overview', component: TenantViewOverviewComponent },
      { path: 'expiry-notices', component: TenantViewExpiryNoticesComponent },
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: '**', redirectTo: 'overview', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenantViewRoutingModule { }
