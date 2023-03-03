import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenantsRoutingModule } from './tenants-routing.module';
import {InlineSVGModule} from "ng-inline-svg-2";
import {NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SharedModule } from 'src/app/shared/shared.module';
import { LetModule, PushModule } from '@ngrx/component';
import { TenantsComponent } from './tenants.component';
import { effectsFeatureModules, storeFeatureModules } from './feature.store';
import { TranslateModule } from '@ngx-translate/core';
import { TenantEditComponent } from './edit/edit.component';
import { TenantCreateComponent } from './create/create.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    TenantsComponent,
    TenantEditComponent,
    TenantCreateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbTooltipModule,
    MatPaginatorModule,
    MatTableModule,
    TenantsRoutingModule,
    SharedModule,
    LetModule,
    PushModule,
    TranslateModule,
    storeFeatureModules,
    effectsFeatureModules,
  ],
})
export class TenantsModule { }
