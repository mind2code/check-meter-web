import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from "rxjs";
import { MaritalSituation } from 'src/app/shared/models/person.model';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';
import { MaritalSituationPageActions } from 'src/app/store/marital-situation/marital-situation.actions';
import * as MaritalSituationSelectors from 'src/app/store/marital-situation/marital-situation.selectors';

@Component({
  selector: 'app-data-marital-situation',
  templateUrl: './marital-situation.component.html',
})
export class DataMaritalSituationComponent implements OnInit, OnDestroy {
  maritalSituations$: Observable<MaritalSituation[]>;

  page = 1;
  totalRecords$: Observable<number>;
  pageSize: number = 100;
  paginationQuery: PaginationQuery = {};

  subscriptions: Record<string, Subscription> = {};

  constructor(
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.maritalSituations$ = this.store.select(MaritalSituationSelectors.selectAll);
    this.totalRecords$ = this.store.select(MaritalSituationSelectors.selectTotalRecords);
    this.refreshList();
  }

  ngOnDestroy(): void {
    for (const subscription of Object.values(this.subscriptions)) {
      subscription.unsubscribe();
    }
  }

  trackById(index: number, item: MaritalSituation): number {
    return item.id;
  }

  refreshList() {
    let currentPage = this.page - 1;
    if (currentPage < 0) {
      currentPage = 0;
    }
    this.paginationQuery = { ...this.paginationQuery, page: currentPage, size: this.pageSize };
    this.store.dispatch(MaritalSituationPageActions.loadAll({ params: this.paginationQuery }));
  }

}
