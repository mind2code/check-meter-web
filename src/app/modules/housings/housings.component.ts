import { Component, OnDestroy, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import { Store } from '@ngrx/store';
import { pagination } from 'src/environments/environment';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';
import { Housing } from 'src/app/shared/models/housing.model';
import { HousingPageActions } from 'src/app/store/housing/housing.actions';
import * as HousingSelectors from 'src/app/store/housing/housing.selectors';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-housings',
  templateUrl: './housings.component.html',
})
export class HousingsComponent implements OnInit, OnDestroy {
  housings$: Observable<Housing[]>;
  loading$: Observable<boolean>;
  totalRecords$: Observable<number>;

  displayedColumns: string[] = [
    'identifiant', 'typeHabitation', 'description', 'localisation',
    'superficie', 'longitude', 'latitude', 'actions'
  ];
  pageSizes: number[] = pagination.pageSizes || [];
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

  trackById(index: number, item: Housing): number {
    return item.id;
  }

  private loadData() {
    this.refreshList();
  }

  onPaginatorChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.paginationQuery = { ...this.paginationQuery, page: event.pageIndex, size: event.pageSize };
    this.refreshList();
  }

  refreshList() {
    this.paginationQuery = { ...this.paginationQuery, size: this.pageSize };
    this.store.dispatch(HousingPageActions.loadAll({ params: this.paginationQuery }));
  }
}
