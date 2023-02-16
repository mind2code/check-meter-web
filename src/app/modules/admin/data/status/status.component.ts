import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from "rxjs";
import { Status } from 'src/app/shared/models/commons.model';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';
import { StatusPageActions } from 'src/app/store/status/status.actions';
import * as StatusSelectors from 'src/app/store/status/status.selectors';

@Component({
  selector: 'app-data-status',
  templateUrl: './status.component.html',
})
export class DataStatusComponent implements OnInit, OnDestroy {
  statutes$: Observable<Status[]>;

  page = 1;
  totalRecords$: Observable<number>;
  pageSize: number = 100;
  paginationQuery: PaginationQuery = {};

  subscriptions: Record<string, Subscription> = {};

  constructor(
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.statutes$ = this.store.select(StatusSelectors.selectAll);
    this.totalRecords$ = this.store.select(StatusSelectors.selectTotalRecords);
    this.refreshList();
  }

  ngOnDestroy(): void {
    for (const subscription of Object.values(this.subscriptions)) {
      subscription.unsubscribe();
    }
  }

  trackById(index: number, item: Status): number {
    return item.id;
  }

  refreshList() {
    let currentPage = this.page - 1;
    if (currentPage < 0) {
      currentPage = 0;
    }
    this.paginationQuery = { ...this.paginationQuery, page: currentPage, size: this.pageSize };
    this.store.dispatch(StatusPageActions.loadAll({ params: this.paginationQuery }));
  }

}
