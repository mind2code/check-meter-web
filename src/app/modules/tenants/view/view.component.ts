import { Component, OnDestroy, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import { Store } from '@ngrx/store';
import * as TenantSelectors from 'src/app/store/tenant/tenant.selectors';
import { Actions, ofType } from '@ngrx/effects';
import { TenantApiActions, TenantPageActions } from 'src/app/store/tenant/tenant.actions';
import { Tenant } from 'src/app/shared/models/tenant.model';

@Component({
  selector: 'app-tenant-view',
  templateUrl: './view.component.html',
})
export class TenantViewComponent implements OnInit, OnDestroy {
  private readonly routerIdParam = 'tenantId';
  tenant$: Observable<Tenant|undefined|null>;

  subscriptions: Record<string, Subscription> = {};

  constructor(
    private store: Store,
    private actions$: Actions,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(TenantPageActions.loadOneFromRouter({ paramName: this.routerIdParam }));
    this.tenant$ = this.store.select(TenantSelectors.selectCurrent);

    this.subscriptions['loadOneSuccessTenant'] = this.actions$.pipe(
      ofType(TenantApiActions.loadOneSuccess),
    ).subscribe(({ item }) => {
      this.store.dispatch(TenantPageActions.selectOne({ id: item.id }));
    });
  }

  ngOnDestroy(): void {
    for (const subscription of Object.values(this.subscriptions)) {
      subscription.unsubscribe();
    }
  }
}
