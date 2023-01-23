import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CivilitesRoutingModule } from './civilites-routing.module';
import { CivilitesComponent } from './civilites.component';
import {NgxPaginationModule} from "ngx-pagination";
import {InlineSVGModule} from "ng-inline-svg-2";
import {LocatairesModule} from "../../locataires/locataires.module";


@NgModule({
  declarations: [
    CivilitesComponent
  ],
  imports: [
    CommonModule,
    CivilitesRoutingModule,
    NgxPaginationModule,
    InlineSVGModule,
  ]
})
export class CivilitesModule { }
