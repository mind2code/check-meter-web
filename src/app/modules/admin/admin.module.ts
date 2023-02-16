import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {InlineSVGModule} from "ng-inline-svg-2";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SharedModule } from 'src/app/shared/shared.module';
import { LetModule, PushModule } from '@ngrx/component';
import { effectsFeatureModules, storeFeatureModules } from './feature.store';
import { TranslateModule } from '@ngx-translate/core';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDataComponent } from './data/data.component';
import { SettingsDataComponent } from './settings/settings.component';
import { DataStatusComponent } from './data/status/status.component';

@NgModule({
  declarations: [
    AdminDataComponent,
    SettingsDataComponent,
    DataStatusComponent,
  ],
  imports: [
    CommonModule,
    // FormsModule,
    // ReactiveFormsModule,
    AdminRoutingModule,
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
export class AdminModule { }
