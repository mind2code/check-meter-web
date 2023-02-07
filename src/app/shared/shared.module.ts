import { NgModule } from '@angular/core';
import { AppOffcanvasComponent } from './components/offcanvas/app-offcanvas.component';
import { AppDisplayFormPathErrorComponent } from './components/forms/app-display-form-path-error.component';
import { AppFormPathFallbackDirective } from './directives/app-form-path-fallback.directive';
import { CommonModule } from '@angular/common';

const declarations = [
  AppOffcanvasComponent,
  AppDisplayFormPathErrorComponent,
  AppFormPathFallbackDirective,
];

@NgModule({
  declarations: [
    declarations,
  ],
  imports: [CommonModule],
  exports: [
    declarations,
  ]
})
export class SharedModule {}
