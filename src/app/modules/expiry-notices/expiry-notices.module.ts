import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpiryNoticeRoutingModule } from './expiry-notices-routing.module';
import {InlineSVGModule} from "ng-inline-svg-2";
import {NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SharedModule } from 'src/app/shared/shared.module';
import { LetModule, PushModule } from '@ngrx/component';
import { ExpiryNoticesComponent } from './expiry-notices.component';
import { effectsFeatureModules, storeFeatureModules } from './feature.store';
import { TranslateModule } from '@ngx-translate/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    ExpiryNoticesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExpiryNoticeRoutingModule,
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
export class ExpiryNoticesModule { }
