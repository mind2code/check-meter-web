import { Component, OnDestroy, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import { Store } from '@ngrx/store';
import { pagination } from 'src/environments/environment';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';
import { Tenant } from 'src/app/shared/models/tenant.model';
import { TenantPageActions } from 'src/app/store/tenant/tenant.actions';
import * as TenantSelectors from 'src/app/store/tenant/tenant.selectors';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.scss'],
})
export class TenantsComponent implements OnInit, OnDestroy {

  tenants$: Observable<Tenant[]>;

  page = 1;
  totalRecords$: Observable<number>;
  pageSize: number = pagination.perPage ?? 25;
  paginationQuery: PaginationQuery = {};

  subscriptions: Record<string, Subscription> = {};

  constructor(
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.tenants$ = this.store.select(TenantSelectors.selectAll);
    this.totalRecords$ = this.store.select(TenantSelectors.selectTotalRecords);
    this.refreshList();

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
}
