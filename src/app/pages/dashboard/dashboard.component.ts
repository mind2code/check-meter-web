import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as TenantSelectors from 'src/app/store/tenant/tenant.selectors';
import * as HousingSelectors from 'src/app/store/housing/housing.selectors';
import * as ContractSelectors from 'src/app/store/contract/contract.selectors';
import * as ExpiryNoticeSelectors from 'src/app/store/expiry-notice/expiry-notice.selectors';
import { TenantPageActions } from 'src/app/store/tenant/tenant.actions';
import { HousingPageActions } from 'src/app/store/housing/housing.actions';
import { ContractPageActions } from 'src/app/store/contract/contract.actions';
import { ExpiryNoticePageActions } from 'src/app/store/expiry-notice/expiry-notice.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  tenantsCount$: Observable<number>;
  housingsCount$: Observable<number>;
  contractsCount$: Observable<number>;
  expiryNoticesCount$: Observable<number>;

  subscriptions: Record<string, Subscription> = {};

  constructor(
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.tenantsCount$ = this.store.select(TenantSelectors.selectTotalRecords);
    this.housingsCount$ = this.store.select(HousingSelectors.selectTotalRecords);
    this.contractsCount$ = this.store.select(ContractSelectors.selectTotalRecords);
    this.expiryNoticesCount$ = this.store.select(ExpiryNoticeSelectors.selectTotalRecords);

    this.loadData();
  }

  ngOnDestroy(): void {
    for (const subscription of Object.values(this.subscriptions)) {
      subscription.unsubscribe();
    }
  }

  private loadData() {
    this.store.dispatch(TenantPageActions.loadAll({ params: { size: 1 } }));
    this.store.dispatch(HousingPageActions.loadAll({ params: { size: 1 } }));
    this.store.dispatch(ContractPageActions.loadAll({ params: { size: 1 } }));
    this.store.dispatch(ExpiryNoticePageActions.loadAll({ params: { size: 1 } }));
  }
}
