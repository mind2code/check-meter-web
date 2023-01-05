import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HabitationsRoutingModule } from './habitations-routing.module';
import { HabitationsComponent } from './habitations.component';
import {InlineSVGModule} from "ng-inline-svg-2";


@NgModule({
  declarations: [
    HabitationsComponent
  ],
    imports: [
        CommonModule,
        HabitationsRoutingModule,
        InlineSVGModule
    ]
})
export class HabitationsModule { }
