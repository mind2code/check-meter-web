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
import { PageEvent } from '@angular/material/paginator';
import { ExpiryNoticeViewComponent } from 'src/app/shared/components/expiry-notices/view/view.component';

@Component({
  selector: 'app-expiry-notices',
  templateUrl: './expiry-notices.component.html',
})
export class ExpiryNoticesComponent implements OnInit, OnDestroy {
  expiryNotices$: Observable<ExpiryNotice[]>;
  loading$: Observable<boolean>;
  totalRecords$: Observable<number>;


  displayedColumns: string[] = [
    'identifiant', 'periodeConcernee', 'tenant', 'contrat',
    'housing', 'sommeDue', 'loyerRestant', 'statut', 'actions'
  ];
  pageSizes: number[] = pagination.pageSizes || [];
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

  onPaginatorChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.paginationQuery = { ...this.paginationQuery, page: event.pageIndex, size: event.pageSize };
    this.refreshList();
  }

  refreshList() {
    this.paginationQuery = { ...this.paginationQuery, size: this.pageSize };
    this.store.dispatch(ExpiryNoticePageActions.loadAll({ params: this.paginationQuery }));
  }

  showDetails(id: string) {
    this.selectOneById(id);
    this.bsOffcanvasRef = this.bsOffcanvasService.open(ExpiryNoticeViewComponent, {
      position: 'end',
      panelClass: 'vw-lg-50 vw-md-100 vw-sm-100',
    });
    this.bsOffcanvasRef.result.then((reason) => {
      //
    }).catch(() => {
      //
    }).finally(() => {
      this.selectOneById(null);
    });
  }

  makePayment(id: string) {
    this.selectOneById(id);
    this.bsOffcanvasRef = this.bsOffcanvasService.open(ExpiryNoticeMakePaymentComponent, {
      backdrop: 'static',
      position: 'end',
      panelClass: 'vw-xxl-25 vw-lg-35 vw-md-50 vw-sm-100',
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