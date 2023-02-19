import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from "rxjs";
import { PersonType } from 'src/app/shared/models/person.model';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';
import { PersonTypePageActions } from 'src/app/store/person-type/person-type.actions';
import * as PersonTypeSelectors from 'src/app/store/person-type/person-type.selectors';

@Component({
  selector: 'app-data-person-type',
  templateUrl: './person-type.component.html',
})
export class DataPersonTypeComponent implements OnInit, OnDestroy {
  personTypes$: Observable<PersonType[]>;

  page = 1;
  totalRecords$: Observable<number>;
  pageSize: number = 100;
  paginationQuery: PaginationQuery = {};

  subscriptions: Record<string, Subscription> = {};

  constructor(
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.personTypes$ = this.store.select(PersonTypeSelectors.selectAll);
    this.totalRecords$ = this.store.select(PersonTypeSelectors.selectTotalRecords);
    this.refreshList();
  }

  ngOnDestroy(): void {
    for (const subscription of Object.values(this.subscriptions)) {
      subscription.unsubscribe();
    }
  }

  trackById(index: number, item: PersonType): number {
    return item.id;
  }

  refreshList() {
    let currentPage = this.page - 1;
    if (currentPage < 0) {
      currentPage = 0;
    }
    this.paginationQuery = { ...this.paginationQuery, page: currentPage, size: this.pageSize };
    this.store.dispatch(PersonTypePageActions.loadAll({ params: this.paginationQuery }));
  }

}
