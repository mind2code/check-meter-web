import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantViewRoutingModule } from './view-routing.module';
import {InlineSVGModule} from "ng-inline-svg-2";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SharedModule } from 'src/app/shared/shared.module';
import { LetModule, PushModule } from '@ngrx/component';
import { TenantViewComponent } from './view.component';
import { effectsFeatureModules, storeFeatureModules } from './feature.store';
import { TranslateModule } from '@ngx-translate/core';
import { TenantViewOverviewComponent } from './overview/overview.component';
import { TenantViewExpiryNoticesComponent } from './expiry-notices/expiry-notices.component';

@NgModule({
  declarations: [
    TenantViewComponent,
    TenantViewOverviewComponent,
    TenantViewExpiryNoticesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TenantViewRoutingModule,
    InlineSVGModule,
    NgbModule,
    SharedModule,
    LetModule,
    PushModule,
    TranslateModule,
    // storeFeatureModules,
    // effectsFeatureModules,
  ],
})
export class TenantViewModule { }
