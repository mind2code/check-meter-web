import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from "rxjs";
import { Civility } from 'src/app/shared/models/person.model';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';
import { CivilityPageActions } from 'src/app/store/civility/civility.actions';
import * as CivilitySelectors from 'src/app/store/civility/civility.selectors';

@Component({
  selector: 'app-data-civility',
  templateUrl: './civility.component.html',
})
export class DataCivilityComponent implements OnInit, OnDestroy {
  civilities$: Observable<Civility[]>;

  page = 1;
  totalRecords$: Observable<number>;
  pageSize: number = 100;
  paginationQuery: PaginationQuery = {};

  subscriptions: Record<string, Subscription> = {};

  constructor(
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.civilities$ = this.store.select(CivilitySelectors.selectAll);
    this.totalRecords$ = this.store.select(CivilitySelectors.selectTotalRecords);
    this.refreshList();
  }

  ngOnDestroy(): void {
    for (const subscription of Object.values(this.subscriptions)) {
      subscription.unsubscribe();
    }
  }

  trackById(index: number, item: Civility): number {
    return item.id;
  }

  refreshList() {
    let currentPage = this.page - 1;
    if (currentPage < 0) {
      currentPage = 0;
    }
    this.paginationQuery = { ...this.paginationQuery, page: currentPage, size: this.pageSize };
    this.store.dispatch(CivilityPageActions.loadAll({ params: this.paginationQuery }));
  }

}
