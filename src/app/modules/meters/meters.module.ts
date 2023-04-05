import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetersRoutingModule } from './meters-routing.module';
import { MetersComponent } from './meters.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { LetModule, PushModule } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { SharedModule } from 'src/app/shared/shared.module';
import { storeFeatureModules, effectsFeatureModules } from '../meters/feature.store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MetersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MetersRoutingModule,
    InlineSVGModule,
    NgbTooltipModule,
    MatPaginatorModule,
    MatTableModule,
    SharedModule,
    LetModule,
    PushModule,
    TranslateModule,
    LeafletModule,
    storeFeatureModules,
    effectsFeatureModules,
  ]
})
export class MetersModule { }
