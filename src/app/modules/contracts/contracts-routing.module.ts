import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractsComponent } from './contracts.component';
import { ContractCreateComponent } from './create/create.component';
import { ContractEditComponent } from './edit/edit.component';
import { ContractViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: '',
    component: ContractsComponent,
  },
  {
    path: 'create',
    component: ContractCreateComponent,
  },
  {
    path: ':contractId/edit',
    component: ContractEditComponent,
  },
  {
    path: ':contractId/view',
    component: ContractViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractsRoutingModule { }
