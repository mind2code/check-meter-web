import { Component, OnDestroy, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import { Store } from '@ngrx/store';
import { pagination } from 'src/environments/environment';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';
import { ExpiryNotice } from 'src/app/shared/models/expiry-notice.model';
import { ExpiryNoticePageActions } from 'src/app/store/expiry-notice/expiry-notice.actions';
import * as ExpiryNoticeSelectors from 'src/app/store/expiry-notice/expiry-notice.selectors';
import { NgbOffcanvas, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { ExpiryNoticeMakePaymentComponent } from 'src/app/shared/components/expiry-notices/make-payment/make-payment.component';
import { SettlementTypePageActions } from 'src/app/store/settlement-type/settlement-type.actions';

@Component({
  selector: 'app-expiry-notices',
  templateUrl: './expiry-notices.component.html',
})
export class ExpiryNoticesComponent implements OnInit, OnDestroy {
  expiryNotices$: Observable<ExpiryNotice[]>;
  loading$: Observable<boolean>;
  totalRecords$: Observable<number>;


  page = 1;
  pageSize: number = pagination.perPage ?? 25;
  paginationQuery: PaginationQuery = {};

  bsOffcanvasRef: NgbOffcanvasRef;
  subscriptions: Record<string, Subscription> = {};

  constructor(
    private store: Store,
    private bsOffcanvasService: NgbOffcanvas,
  ) {}

  ngOnInit(): void {
    this.expiryNotices$ = this.store.select(ExpiryNoticeSelectors.selectAll);
    this.totalRecords$ = this.store.select(ExpiryNoticeSelectors.selectTotalRecords);
    this.loading$ = this.store.select(ExpiryNoticeSelectors.selectLoading);

    this.loadData();
  }

  ngOnDestroy(): void {
    for (const subscription of Object.values(this.subscriptions)) {
      subscription.unsubscribe();
    }
  }

  trackById(index: number, item: ExpiryNotice): string {
    return item.id;
  }

  private loadData() {
    this.refreshList();
    this.store.dispatch(SettlementTypePageActions.loadAll({ params: { size: 100 } }));
  }

  refreshList() {
    let currentPage = this.page - 1;
    if (currentPage < 0) {
      currentPage = 0;
    }
    this.paginationQuery = { ...this.paginationQuery, page: currentPage, size: this.pageSize };
    this.store.dispatch(ExpiryNoticePageActions.loadAll({ params: this.paginationQuery }));
  }

  makePayment(id: string) {
    this.selectOneById(id);
    this.bsOffcanvasRef = this.bsOffcanvasService.open(ExpiryNoticeMakePaymentComponent, {
      backdrop: 'static',
      position: 'end',
    });
    this.bsOffcanvasRef.result.then((reason) => {
      if (reason === 'success') {
        this.refreshList();
      }
    }).catch(() => {
      //
    }).finally(() => {
      this.selectOneById(null);
    });
  }

  private selectOneById(id: string|null) {
    this.store.dispatch(ExpiryNoticePageActions.selectOne({ id: id }));
  }
}
