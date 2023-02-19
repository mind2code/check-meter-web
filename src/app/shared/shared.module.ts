import { NgModule } from '@angular/core';
import { AppOffcanvasComponent } from './components/offcanvas/app-offcanvas.component';
import { AppDisplayFormPathErrorComponent } from './components/forms/app-display-form-path-error.component';
import { AppFormPathFallbackDirective } from './directives/app-form-path-fallback.directive';
import { CommonModule } from '@angular/common';
import { StatusPipe } from './pipes/status.pipe';
import { AppProgressSpinnerComponent } from './components/spinners/app-progress-spinner.component';
import { TranslateModule } from '@ngx-translate/core';

const declarations = [
  AppOffcanvasComponent,
  AppDisplayFormPathErrorComponent,
  AppFormPathFallbackDirective,
  StatusPipe,
  AppProgressSpinnerComponent,
];

@NgModule({
  declarations: [
    declarations,
  ],
  imports: [
    CommonModule,
    TranslateModule,
  ],
  exports: [
    declarations,
  ]
})
export class SharedModule {}
