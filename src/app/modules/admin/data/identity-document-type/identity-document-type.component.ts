import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from "rxjs";
import { IdentityDocumentType } from 'src/app/shared/models/identity-document.model';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';
import { IdentityDocumentTypePageActions } from 'src/app/store/identity-document-type/identity-document-type.actions';
import * as IdentityDocumentTypeSelectors from 'src/app/store/identity-document-type/identity-document-type.selectors';

@Component({
  selector: 'app-data-identity-document-type',
  templateUrl: './identity-document-type.component.html',
})
export class DataIdentityDocumentTypeComponent implements OnInit, OnDestroy {
  identityDocumentTypes$: Observable<IdentityDocumentType[]>;

  page = 1;
  totalRecords$: Observable<number>;
  pageSize: number = 100;
  paginationQuery: PaginationQuery = {};

  subscriptions: Record<string, Subscription> = {};

  constructor(
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.identityDocumentTypes$ = this.store.select(IdentityDocumentTypeSelectors.selectAll);
    this.totalRecords$ = this.store.select(IdentityDocumentTypeSelectors.selectTotalRecords);
    this.refreshList();
  }

  ngOnDestroy(): void {
    for (const subscription of Object.values(this.subscriptions)) {
      subscription.unsubscribe();
    }
  }

  trackById(index: number, item: IdentityDocumentType): string {
    return item.id;
  }

  refreshList() {
    let currentPage = this.page - 1;
    if (currentPage < 0) {
      currentPage = 0;
    }
    this.paginationQuery = { ...this.paginationQuery, page: currentPage, size: this.pageSize };
    this.store.dispatch(IdentityDocumentTypePageActions.loadAll({ params: this.paginationQuery }));
  }

}
