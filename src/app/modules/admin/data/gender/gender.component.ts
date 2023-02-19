import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from "rxjs";
import { Gender } from 'src/app/shared/models/person.model';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';
import { GenderPageActions } from 'src/app/store/gender/gender.actions';
import * as GenderSelectors from 'src/app/store/gender/gender.selectors';

@Component({
  selector: 'app-data-gender',
  templateUrl: './gender.component.html',
})
export class DataGenderComponent implements OnInit, OnDestroy {
  genders$: Observable<Gender[]>;

  page = 1;
  totalRecords$: Observable<number>;
  pageSize: number = 100;
  paginationQuery: PaginationQuery = {};

  subscriptions: Record<string, Subscription> = {};

  constructor(
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.genders$ = this.store.select(GenderSelectors.selectAll);
    this.totalRecords$ = this.store.select(GenderSelectors.selectTotalRecords);
    this.refreshList();
  }

  ngOnDestroy(): void {
    for (const subscription of Object.values(this.subscriptions)) {
      subscription.unsubscribe();
    }
  }

  trackById(index: number, item: Gender): number {
    return item.id;
  }

  refreshList() {
    let currentPage = this.page - 1;
    if (currentPage < 0) {
      currentPage = 0;
    }
    this.paginationQuery = { ...this.paginationQuery, page: currentPage, size: this.pageSize };
    this.store.dispatch(GenderPageActions.loadAll({ params: this.paginationQuery }));
  }

}
