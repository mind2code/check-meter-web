import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantViewRoutingModule } from './view-routing.module';
import {InlineSVGModule} from "ng-inline-svg-2";
import {NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SharedModule } from 'src/app/shared/shared.module';
import { LetModule, PushModule } from '@ngrx/component';
import { TenantViewComponent } from './view.component';
import { effectsFeatureModules, storeFeatureModules } from './feature.store';
import { TranslateModule } from '@ngx-translate/core';
import { TenantViewOverviewComponent } from './overview/overview.component';
import { TenantViewExpiryNoticesComponent } from './expiry-notices/expiry-notices.component';
import { TenantViewContractsComponent } from './contracts/contracts.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    TenantViewComponent,
    TenantViewOverviewComponent,
    TenantViewContractsComponent,
    TenantViewExpiryNoticesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TenantViewRoutingModule,
    InlineSVGModule,
    NgbTooltipModule,
    MatPaginatorModule,
    MatTableModule,
    SharedModule,
    LetModule,
    PushModule,
    TranslateModule,
    storeFeatureModules,
    effectsFeatureModules,
  ],
})
export class TenantViewModule { }
