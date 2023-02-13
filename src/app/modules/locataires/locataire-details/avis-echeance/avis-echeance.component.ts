import { Component, OnDestroy, OnInit } from '@angular/core';
import {AvisEncaisserComponent} from "./avis-encaisser/avis-encaisser.component";
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { NgbOffcanvas, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { ExpiryNoticePageActions } from 'src/app/store/expiry-notice/expiry-notice.actions';
import * as ExpiryNoticeSelector from 'src/app/store/expiry-notice/expiry-notice.selectors';
import { ExpiryNotice } from 'src/app/shared/models/expiry-notice.model';
import { pagination } from 'src/environments/environment';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';

@Component({
  selector: 'app-avis-echeance',
  templateUrl: './avis-echeance.component.html',
  styleUrls: ['./avis-echeance.component.scss']
})
export class AvisEcheanceComponent implements OnInit, OnDestroy {

  expiryNotices$: Observable<ExpiryNotice[]>;

  page = 0;
  totalRecords: Observable<number>;
  pageSize: number = pagination.perPage ?? 25;
  paginationQuery: PaginationQuery = {};

  bsOffcanvasRef: NgbOffcanvasRef;

  subscriptions: Array<Subscription> = [];

  constructor(
    private bsOffcanvasService: NgbOffcanvas,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.expiryNotices$ = this.store.select(ExpiryNoticeSelector.selectAll);
    this.totalRecords = this.store.select(ExpiryNoticeSelector.selectTotalRecords);
    this.refreshList();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  trackById(index: number, item: ExpiryNotice): string {
    return item.id;
  }

  refreshList() {
    this.paginationQuery.page = this.page - 1;
    if (this.paginationQuery.page < 0) this.paginationQuery.page = 0;
    this.paginationQuery.size = this.pageSize;
    this.store.dispatch(ExpiryNoticePageActions.loadAll({ params: this.paginationQuery }));
  }

  selectOneById(id: string|null) {
    this.store.dispatch(ExpiryNoticePageActions.selectOne({ id: id }));
  }

  encaisser(id: string) {
    this.selectOneById(id);
    this.bsOffcanvasRef = this.bsOffcanvasService.open(AvisEncaisserComponent, {
      backdrop: 'static',
      position: 'end',
    });
    this.bsOffcanvasRef.result.then((reason) => {
      if (reason === 'success') {
        console.log('******** operation result reason', reason);
        this.refreshList();
      }
    }).catch((reason) => {

    }).finally(() => this.selectOneById(null));
  }

}
