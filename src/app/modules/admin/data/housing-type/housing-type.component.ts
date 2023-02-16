import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from "rxjs";
import { HousingType } from 'src/app/shared/models/housing.model';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';
import { HousingTypePageActions } from 'src/app/store/housing-type/housing-type.actions';
import * as HousingTypeSelectors from 'src/app/store/housing-type/housing-type.selectors';

@Component({
  selector: 'app-data-housing-type',
  templateUrl: './housing-type.component.html',
})
export class DataHousingTypeComponent implements OnInit, OnDestroy {
  housingTypes$: Observable<HousingType[]>;

  page = 1;
  totalRecords$: Observable<number>;
  pageSize: number = 100;
  paginationQuery: PaginationQuery = {};

  subscriptions: Record<string, Subscription> = {};

  constructor(
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.housingTypes$ = this.store.select(HousingTypeSelectors.selectAll);
    this.totalRecords$ = this.store.select(HousingTypeSelectors.selectTotalRecords);
    this.refreshList();
  }

  ngOnDestroy(): void {
    for (const subscription of Object.values(this.subscriptions)) {
      subscription.unsubscribe();
    }
  }

  trackById(index: number, item: HousingType): string {
    return item.id;
  }

  refreshList() {
    let currentPage = this.page - 1;
    if (currentPage < 0) {
      currentPage = 0;
    }
    this.paginationQuery = { ...this.paginationQuery, page: currentPage, size: this.pageSize };
    this.store.dispatch(HousingTypePageActions.loadAll({ params: this.paginationQuery }));
  }

}
