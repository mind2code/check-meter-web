import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDataComponent } from './data/data.component';
import { SettingsDataComponent } from './settings/settings.component';

const routes: Routes = [
  { path: 'data', component: AdminDataComponent },
  { path: 'settings', component: SettingsDataComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
