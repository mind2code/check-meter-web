import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ɵGetProperty } from '@angular/forms';

@Component({
  selector: 'app-display-form-path-error',
  template: `
    <div class="fv-plugins-message-container invalid-feedback" *ngIf="pathControl?.invalid && pathControl?.dirty"
    >
    {{ getError(pathControl?.errors) }}
    </div>
  `
})
export class AppDisplayFormPathErrorComponent {
  @Input() pathControl: AbstractControl<ɵGetProperty<any, string>> | null = null;

  getError(errors: any) {
    if (errors && Object.values(errors).length > 0) {
      const error = Object.values(errors)[0];
      if (typeof error === 'string') {
        return error;
      } else if (typeof error === 'object') {
        if (error && Object.prototype.hasOwnProperty.call(error || {}, 'actual')) {
          return (error as any || {})['actual'];
        }
      }
    }
    return;
  }
}
