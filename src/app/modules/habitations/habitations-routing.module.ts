import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HabitationsComponent } from './habitations.component';
import {CreateHabitationsComponent} from "./create-habitations/create-habitations.component";

const routes: Routes = [{ path: '', component: HabitationsComponent },
  { path:'create', component: CreateHabitationsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HabitationsRoutingModule { }
