import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HabitationsRoutingModule } from './habitations-routing.module';
import { HabitationsComponent } from './habitations.component';
import {InlineSVGModule} from "ng-inline-svg-2";
import { CreateHabitationsComponent } from './create-habitations/create-habitations.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    HabitationsComponent,
    CreateHabitationsComponent
  ],
    imports: [
        CommonModule,
        HabitationsRoutingModule,
        InlineSVGModule,
        ReactiveFormsModule
    ]
})
export class HabitationsModule { }
