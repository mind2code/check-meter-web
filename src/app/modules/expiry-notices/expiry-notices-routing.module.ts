import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpiryNoticesComponent } from './expiry-notices.component';

const routes: Routes = [
  {
    path: '',
    component: ExpiryNoticesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpiryNoticeRoutingModule { }
