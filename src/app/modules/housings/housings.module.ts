import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HousingsRoutingModule } from './housings-routing.module';
import {InlineSVGModule} from "ng-inline-svg-2";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SharedModule } from 'src/app/shared/shared.module';
import { LetModule, PushModule } from '@ngrx/component';
import { HousingsComponent } from './housings.component';
import { effectsFeatureModules, storeFeatureModules } from './feature.store';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    HousingsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HousingsRoutingModule,
    InlineSVGModule,
    NgbModule,
    SharedModule,
    LetModule,
    PushModule,
    TranslateModule,
    storeFeatureModules,
    effectsFeatureModules,
  ],
})
export class HousingsModule { }