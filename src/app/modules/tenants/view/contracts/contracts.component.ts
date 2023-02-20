import { Component, OnDestroy, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import { Store } from '@ngrx/store';
import { pagination } from 'src/environments/environment';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';
import { Contract } from 'src/app/shared/models/contract.model';
import { ContractPageActions } from 'src/app/store/contract/contract.actions';
import * as ContractSelectors from 'src/app/store/contract/contract.selectors';

@Component({
  selector: 'app-tenant-view-contracts',
  templateUrl: './contracts.component.html',
})
export class TenantViewContractsComponent implements OnInit, OnDestroy {
  contracts$: Observable<Contract[]>;
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
    this.contracts$ = this.store.select(ContractSelectors.selectAll);
    this.loading$ = this.store.select(ContractSelectors.selectLoading);
    this.totalRecords$ = this.store.select(ContractSelectors.selectTotalRecords);
    this.loadData();

  }

  ngOnDestroy(): void {
    for (const subscription of Object.values(this.subscriptions)) {
      subscription.unsubscribe();
    }
  }

  trackById(index: number, item: Contract): string {
    return item.id;
  }

  private loadData() {
    this.refreshList();
  }

  refreshList() {
    let currentPage = this.page - 1;
    if (currentPage < 0) {
      currentPage = 0;
    }
    this.paginationQuery = { ...this.paginationQuery, page: currentPage, size: this.pageSize };
    this.store.dispatch(ContractPageActions.loadAll({ params: this.paginationQuery }));
  }
}
