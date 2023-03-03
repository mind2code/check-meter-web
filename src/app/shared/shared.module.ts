import { NgModule } from '@angular/core';
import { AppOffcanvasComponent } from './components/offcanvas/app-offcanvas.component';
import { AppDisplayFormPathErrorComponent } from './components/forms/app-display-form-path-error.component';
import { AppFormPathFallbackDirective } from './directives/app-form-path-fallback.directive';
import { CommonModule } from '@angular/common';
import { StatusPipe } from './pipes/status.pipe';
import { AppProgressSpinnerComponent } from './components/spinners/app-progress-spinner.component';
import { TranslateModule } from '@ngx-translate/core';
import { ExpiryNoticeMakePaymentComponent } from './components/expiry-notices/make-payment/make-payment.component';
import { ExpiryNoticeViewComponent } from './components/expiry-notices/view/view.component';
import { LetModule, PushModule } from '@ngrx/component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { MatTableModule } from '@angular/material/table';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

const declarations = [
  AppOffcanvasComponent,
  AppDisplayFormPathErrorComponent,
  AppFormPathFallbackDirective,
  StatusPipe,
  AppProgressSpinnerComponent,
  ExpiryNoticeMakePaymentComponent,
  ExpiryNoticeViewComponent,
];

@NgModule({
  declarations: [
    declarations,
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
  ],
  exports: [
    declarations,
  ]
})
export class SharedModule {}
