import { MeterViewComponent } from './components/meters/view/view.component';
import { NgModule } from '@angular/core';
import { AppOffcanvasComponent } from './components/offcanvas/app-offcanvas.component';
import { AppDisplayFormPathErrorComponent } from './components/forms/app-display-form-path-error.component';
import { AppFormPathFallbackDirective } from './directives/app-form-path-fallback.directive';
import { CommonModule } from '@angular/common';
import { StatusPipe } from './pipes/status.pipe';
import { AppProgressSpinnerComponent } from './components/spinners/app-progress-spinner.component';
import { TranslateModule } from '@ngx-translate/core';
import { LetModule, PushModule } from '@ngrx/component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { MatTableModule } from '@angular/material/table';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

const declarations = [
  AppOffcanvasComponent,
  AppDisplayFormPathErrorComponent,
  AppFormPathFallbackDirective,
  StatusPipe,
  AppProgressSpinnerComponent,
  MeterViewComponent
];

@NgModule({
  declarations: [
    declarations
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    TranslateModule,
    MatTableModule,
    NgbTooltipModule,
    LetModule,
    PushModule,
    LeafletModule,
  ],
  exports: [
    declarations,
  ]
})
export class SharedModule {}
