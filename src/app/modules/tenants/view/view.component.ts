import { Component, OnDestroy, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import { Store } from '@ngrx/store';
import { pagination } from 'src/environments/environment';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';
import * as PersonSelectors from 'src/app/store/person/person.selectors';
import { Person } from 'src/app/shared/models/person.model';
import { PersonPageActions } from 'src/app/store/person/person.actions';
import { PageInfoService } from 'src/app/_template/layout';

@Component({
  selector: 'app-tenant-view',
  templateUrl: './view.component.html',
})
export class TenantViewComponent implements OnInit, OnDestroy {

  tenants$: Observable<Person[]>;

  page = 1;
  totalRecords$: Observable<number>;
  pageSize: number = pagination.perPage ?? 25;
  paginationQuery: PaginationQuery = {};

  subscriptions: Record<string, Subscription> = {};

  constructor(
    private store: Store,
    private pageInfo: PageInfoService,
  ) {}

  ngOnInit(): void {
    // this.tenants$ = this.store.select(PersonSelectors.selectAll);
    // this.totalRecords$ = this.store.select(PersonSelectors.selectTotalRecords);
    // this.refreshList();
    this.pageInfo.updateTitle(`Détails d'un locataire`);
  }

  ngOnDestroy(): void {
    for (const subscription of Object.values(this.subscriptions)) {
      subscription.unsubscribe();
    }
  }

  trackById(index: number, item: Person): string {
    return item.id;
  }

  refreshList() {
    let currentPage = this.page - 1;
    if (currentPage < 0) {
      currentPage = 0;
    }
    this.paginationQuery = { ...this.paginationQuery, page: currentPage, size: this.pageSize };
    this.store.dispatch(PersonPageActions.loadAll({ params: this.paginationQuery }));
  }
}
