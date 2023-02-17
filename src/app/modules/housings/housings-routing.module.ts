import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HousingsComponent } from './housings.component';
import { HousingCreateComponent } from './create/create.component';
import { HousingEditComponent } from './edit/edit.component';
import { HousingViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: '',
    component: HousingsComponent,
  },
  {
    path: 'create',
    component: HousingCreateComponent,
  },
  {
    path: ':housingId/edit',
    component: HousingEditComponent,
  },
  {
    path: ':housingId/view',
    component: HousingViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HousingsRoutingModule { }
