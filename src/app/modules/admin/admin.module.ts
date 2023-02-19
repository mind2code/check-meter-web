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
import { DataHousingTypeComponent } from './data/housing-type/housing-type.component';
import { DataSettlementTypeComponent } from './data/settlement-type/settlement-type.component';
import { DataMaritalSituationComponent } from './data/marital-situation/marital-situation.component';
import { DataIdentityDocumentTypeComponent } from './data/identity-document-type/identity-document-type.component';
import { DataCivilityComponent } from './data/civility/civility.component';
import { DataGenderComponent } from './data/gender/gender.component';
import { DataCountryComponent } from './data/country/country.component';
import { DataPersonTypeComponent } from './data/person-type/person-type.component';

@NgModule({
  declarations: [
    AdminDataComponent,
    SettingsDataComponent,
    DataStatusComponent,
    DataSettlementTypeComponent,
    DataHousingTypeComponent,
    DataMaritalSituationComponent,
    DataIdentityDocumentTypeComponent,
    DataCivilityComponent,
    DataGenderComponent,
    DataCountryComponent,
    DataPersonTypeComponent,
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
