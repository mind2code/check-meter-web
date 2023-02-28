import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import { Store } from '@ngrx/store';
import { pagination } from 'src/environments/environment';
import * as TenantSelectors from 'src/app/store/tenant/tenant.selectors';
import { Tenant } from 'src/app/shared/models/tenant.model';
import { TenantPageActions } from 'src/app/store/tenant/tenant.actions';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
})
export class TenantsComponent implements OnInit, OnDestroy {
  tenants$: Observable<Tenant[]>;
  loading$: Observable<boolean>;
  totalRecords$: Observable<number>;

  displayedColumns: string[] = ['identifiant', 'nomComplet', 'solde', 'typePersonne', 'actions'];
  pageSizes: number[] = pagination.pageSizes || [];
  pageSize: number = pagination.perPage ?? 25;
  paginationQuery: PaginationQuery = {};

  subscriptions: Record<string, Subscription> = {};

  @ViewChild(MatPaginator) paginator: MatPaginator;

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
    this.paginationQuery = { ...this.paginationQuery, size: this.pageSize };
    this.store.dispatch(TenantPageActions.loadAll({ params: this.paginationQuery }));
  }

  onPaginatorChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.paginationQuery = { ...this.paginationQuery, page: event.pageIndex, size: event.pageSize };
    this.refreshList();
  }

  private loadData() {
    this.refreshList();
  }

}
