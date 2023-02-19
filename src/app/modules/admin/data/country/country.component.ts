import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from "rxjs";
import { Country } from 'src/app/shared/models/country.model';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';
import { CountryPageActions } from 'src/app/store/country/country.actions';
import * as CountrySelectors from 'src/app/store/country/country.selectors';

@Component({
  selector: 'app-data-country',
  templateUrl: './country.component.html',
})
export class DataCountryComponent implements OnInit, OnDestroy {
  countries$: Observable<Country[]>;

  page = 1;
  totalRecords$: Observable<number>;
  pageSize: number = 100;
  paginationQuery: PaginationQuery = {};

  subscriptions: Record<string, Subscription> = {};

  constructor(
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.countries$ = this.store.select(CountrySelectors.selectAll);
    this.totalRecords$ = this.store.select(CountrySelectors.selectTotalRecords);
    this.refreshList();
  }

  ngOnDestroy(): void {
    for (const subscription of Object.values(this.subscriptions)) {
      subscription.unsubscribe();
    }
  }

  trackById(index: number, item: Country): number {
    return item.id;
  }

  refreshList() {
    let currentPage = this.page - 1;
    if (currentPage < 0) {
      currentPage = 0;
    }
    this.paginationQuery = { ...this.paginationQuery, page: currentPage, size: this.pageSize };
    this.store.dispatch(CountryPageActions.loadAll({ params: this.paginationQuery }));
  }

}
