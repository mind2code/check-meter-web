import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from "rxjs";
import { SettlementType } from 'src/app/shared/models/rent-receipt.model';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';
import { SettlementTypePageActions } from 'src/app/store/settlement-type/settlement-type.actions';
import * as SettlementTypeSelectors from 'src/app/store/settlement-type/settlement-type.selectors';

@Component({
  selector: 'app-data-settlement-type',
  templateUrl: './settlement-type.component.html',
})
export class DataSettlementTypeComponent implements OnInit, OnDestroy {
  settlementTypes$: Observable<SettlementType[]>;

  page = 1;
  totalRecords$: Observable<number>;
  pageSize: number = 100;
  paginationQuery: PaginationQuery = {};

  subscriptions: Record<string, Subscription> = {};

  constructor(
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.settlementTypes$ = this.store.select(SettlementTypeSelectors.selectAll);
    this.totalRecords$ = this.store.select(SettlementTypeSelectors.selectTotalRecords);
    this.refreshList();
  }

  ngOnDestroy(): void {
    for (const subscription of Object.values(this.subscriptions)) {
      subscription.unsubscribe();
    }
  }

  trackById(index: number, item: SettlementType): number {
    return item.id;
  }

  refreshList() {
    let currentPage = this.page - 1;
    if (currentPage < 0) {
      currentPage = 0;
    }
    this.paginationQuery = { ...this.paginationQuery, page: currentPage, size: this.pageSize };
    this.store.dispatch(SettlementTypePageActions.loadAll({ params: this.paginationQuery }));
  }

}
