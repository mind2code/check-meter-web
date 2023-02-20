import { Component, OnDestroy, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import { Store } from '@ngrx/store';
import { pagination } from 'src/environments/environment';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';
import * as TenantSelectors from 'src/app/store/tenant/tenant.selectors';
import { Tenant } from 'src/app/shared/models/tenant.model';
import { TenantPageActions } from 'src/app/store/tenant/tenant.actions';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
})
export class TenantsComponent implements OnInit, OnDestroy {
  tenants$: Observable<Tenant[]>;
  loading$: Observable<boolean>;
  totalRecords$: Observable<number>;

  page = 1;
  pageSize: number = pagination.perPage ?? 25;
  paginationQuery: PaginationQuery = {};

  subscriptions: Record<string, Subscription> = {};

  constructor(
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.tenants$ = this.store.select(TenantSelectors.selectAll);
    this.totalRecords$ = this.store.select(TenantSelectors.selectTotalRecords);
    this.loading$ = this.store.select(TenantSelectors.selectLoading);

    this.loadData();
  }

  ngOnDestroy(): void {
    for (const subscription of Object.values(this.subscriptions)) {
      subscription.unsubscribe();
    }
  }

  trackById(index: number, item: Tenant): string {
    return item.id;
  }

  refreshList() {
    let currentPage = this.page - 1;
    if (currentPage < 0) {
      currentPage = 0;
    }
    this.paginationQuery = { ...this.paginationQuery, page: currentPage, size: this.pageSize };
    this.store.dispatch(TenantPageActions.loadAll({ params: this.paginationQuery }));
  }

  private loadData() {
    this.refreshList();
  }
}
