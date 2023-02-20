import { Component, OnDestroy, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import { Store } from '@ngrx/store';
import * as TenantSelectors from 'src/app/store/tenant/tenant.selectors';
import * as ContractSelectors from 'src/app/store/contract/contract.selectors';
import * as ExpiryNoticeSelectors from 'src/app/store/expiry-notice/expiry-notice.selectors';
import { Actions, ofType } from '@ngrx/effects';
import { TenantApiActions, TenantPageActions } from 'src/app/store/tenant/tenant.actions';
import { Tenant } from 'src/app/shared/models/tenant.model';
import { ContractPageActions } from 'src/app/store/contract/contract.actions';
import { ExpiryNoticePageActions } from 'src/app/store/expiry-notice/expiry-notice.actions';

@Component({
  selector: 'app-tenant-view',
  templateUrl: './view.component.html',
})
export class TenantViewComponent implements OnInit, OnDestroy {
  private readonly routerIdParam = 'tenantId';
  tenant$: Observable<Tenant|undefined|null>;
  contractCount$: Observable<number>;
  expiryNoticeCount$: Observable<number>;

  subscriptions: Record<string, Subscription> = {};

  constructor(
    private store: Store,
    private actions$: Actions,
  ) {}

  ngOnInit(): void {
    this.tenant$ = this.store.select(TenantSelectors.selectCurrent);
    this.contractCount$ = this.store.select(ContractSelectors.selectTotalRecords);
    this.expiryNoticeCount$ = this.store.select(ExpiryNoticeSelectors.selectTotalRecords);

    this.loadData()
    this.createSuccessResultAction();
  }

  ngOnDestroy(): void {
    for (const subscription of Object.values(this.subscriptions)) {
      subscription.unsubscribe();
    }
  }

  private loadData() {
    this.store.dispatch(TenantPageActions.loadOneFromRouter({ paramName: this.routerIdParam }));
    this.store.dispatch(ContractPageActions.loadAll({ params: { size: 1 } }));
    this.store.dispatch(ExpiryNoticePageActions.loadAll({ params: { size: 1 } }));
  }

  private createSuccessResultAction() {
    this.subscriptions['loadOneSuccessTenant'] = this.actions$.pipe(
      ofType(TenantApiActions.loadOneSuccess),
    ).subscribe(({ item }) => {
      this.store.dispatch(TenantPageActions.selectOne({ id: item.id }));
    });
  }
}
