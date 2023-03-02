import { Component, OnDestroy, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import { Store } from '@ngrx/store';
import * as ExpiryNoticeSelectors from 'src/app/store/expiry-notice/expiry-notice.selectors';
import { ExpiryNotice } from 'src/app/shared/models/expiry-notice.model';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';

type Tabs = 'overview' | 'rent-receipt';

@Component({
  selector: 'app-expiry-notice-view',
  templateUrl: './view.component.html',
})
export class ExpiryNoticeViewComponent implements OnInit, OnDestroy {
  expiryNotice$: Observable<ExpiryNotice|null|undefined>;

  activeTab: Tabs = 'overview';
  displayedPaymentColumns: string[] = [
    'identifiant', 'dateReglement', 'montantRegle',
    'typeReglement', 'observation'
  ];

  subscriptions: Record<string, Subscription> = {};

  constructor(
    private store: Store,
    public bsActiveOffcanvas: NgbActiveOffcanvas,
  ) {}

  ngOnInit(): void {
    this.expiryNotice$ = this.store.select(ExpiryNoticeSelectors.selectCurrent);
  }

  ngOnDestroy(): void {
    for (const subscription of Object.values(this.subscriptions)) {
      subscription.unsubscribe();
    }
  }

  onClose(reason?: string) {
    if (reason === 'success') {
      this.bsActiveOffcanvas.close(reason)
    } else {
      this.bsActiveOffcanvas.dismiss(reason || 'close')
    }
  }

  setActiveTab(tab: Tabs) {
    this.activeTab = tab;
  }
}
