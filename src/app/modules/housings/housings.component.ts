import { Component, OnDestroy, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import { Store } from '@ngrx/store';
import { pagination } from 'src/environments/environment';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';
import { Housing } from 'src/app/shared/models/housing.model';
import { HousingPageActions } from 'src/app/store/housing/housing.actions';
import * as HousingSelectors from 'src/app/store/housing/housing.selectors';

@Component({
  selector: 'app-housings',
  templateUrl: './housings.component.html',
})
export class HousingsComponent implements OnInit, OnDestroy {
  housings$: Observable<Housing[]>;
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
    this.housings$ = this.store.select(HousingSelectors.selectAll);
    this.loading$ = this.store.select(HousingSelectors.selectLoading);
    this.totalRecords$ = this.store.select(HousingSelectors.selectTotalRecords);

    this.loadData();
  }

  ngOnDestroy(): void {
    for (const subscription of Object.values(this.subscriptions)) {
      subscription.unsubscribe();
    }
  }

  trackById(index: number, item: Housing): string {
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
    this.store.dispatch(HousingPageActions.loadAll({ params: this.paginationQuery }));
  }
}
