import { Component } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-offcanvas',
  template: `
    <div class="bg-body">
      <div class="card w-100 rounded-0">
        <div class="card-header">
            <div class="card-title">
              <div class="fw-bolder lh-1 text-gray-900">
              <ng-content select="[title]"></ng-content>
              </div>
            </div>
            <div class="card-toolbar">
              <button type="button" class="btn-sm btn-close btn-active-light-primary" aria-label="Close" (click)="bsActiveOffcanvas.dismiss('close')">
              </button>
            </div>
        </div>
        <div class="card-body p-9">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
})
export class AppOffcanvasComponent {
  constructor(public bsActiveOffcanvas: NgbActiveOffcanvas) {}
}
