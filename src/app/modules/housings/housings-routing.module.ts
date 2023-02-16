import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HousingsComponent } from './housings.component';

const routes: Routes = [
  { path: '', component: HousingsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HousingsRoutingModule { }
