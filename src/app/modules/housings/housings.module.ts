import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HousingsRoutingModule } from './housings-routing.module';
import {InlineSVGModule} from "ng-inline-svg-2";
import {NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SharedModule } from 'src/app/shared/shared.module';
import { LetModule, PushModule } from '@ngrx/component';
import { HousingsComponent } from './housings.component';
import { effectsFeatureModules, storeFeatureModules } from './feature.store';
import { TranslateModule } from '@ngx-translate/core';
import { HousingCreateComponent } from './create/create.component';
import { HousingEditComponent } from './edit/edit.component';
import { HousingViewComponent } from './view/view.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    HousingsComponent,
    HousingCreateComponent,
    HousingEditComponent,
    HousingViewComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HousingsRoutingModule,
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
export class HousingsModule { }
