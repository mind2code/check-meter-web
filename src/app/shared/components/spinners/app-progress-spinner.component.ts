import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-progress-spinner',
  template: `
    <span class="indicator-progress d-flex align-items-center">
      <span class="spinner-border align-middle me-2" [ngClass]="getSpinnerBorderClass()"></span>
      <ng-container *ngIf="displayMessage">
        {{ message }}
      </ng-container>
    </span>
  `,
})
export class AppProgressSpinnerComponent implements OnInit, OnDestroy {
  @Input() displayMessage: boolean = true;
  @Input() message?: string;
  @Input() spinnerBorderSize: 'sm'|'lg' = 'sm';

  spinnerBorderSizeClass: string;
  subscriptions: Record<string, Subscription> = {};

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.subscriptions['getLoadingMessage'] = this.translate.get('MESSAGE.LOADING')
      .subscribe((value) => this.message = this.message ?? value)
    ;
  }

  ngOnDestroy(): void {
    for (const subscription of Object.values(this.subscriptions)) {
      subscription.unsubscribe();
    }
  }

  getSpinnerBorderClass() {
    return `spinner-border-${this.spinnerBorderSize}`;
  }
}
