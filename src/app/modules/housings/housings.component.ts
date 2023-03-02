import { Component, OnDestroy, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import { Store } from '@ngrx/store';
import { pagination } from 'src/environments/environment';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';
import { Housing } from 'src/app/shared/models/housing.model';
import { HousingPageActions } from 'src/app/store/housing/housing.actions';
import * as HousingSelectors from 'src/app/store/housing/housing.selectors';
import { PageEvent } from '@angular/material/paginator';
import { NgbOffcanvas, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { HousingViewComponent } from 'src/app/shared/components/housings/view/view.component';

@Component({
  selector: 'app-housings',
  templateUrl: './housings.component.html',
})
export class HousingsComponent implements OnInit, OnDestroy {
  housings$: Observable<Housing[]>;
  loading$: Observable<boolean>;
  totalRecords$: Observable<number>;

  displayedColumns: string[] = [
    'identifiant', 'typeHabitation', 'localisation', 'description',
    'superficie', 'longitude', 'latitude', 'actions'
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
    this.housings$ = this.store.select(HousingSelectors.selectAll);
    this.loading$ = this.store.select(HousingSelectors.selectLoading);
    this.totalRecords$ = this.store.select(HousingSelectors.selectTotalRecords);

    this.loadData();
  }

  ngOnDestroy(): void {
    for (const subscription of Object.values(this.subscriptions)) {
      subscription.unsubscribe();
    }
  }

  trackById(index: number, item: Housing): number {
    return item.id;
  }

  private loadData() {
    this.refreshList();
  }

  onPaginatorChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.paginationQuery = { ...this.paginationQuery, page: event.pageIndex, size: event.pageSize };
    this.refreshList();
  }

  refreshList() {
    this.paginationQuery = { ...this.paginationQuery, size: this.pageSize };
    this.store.dispatch(HousingPageActions.loadAll({ params: this.paginationQuery }));
  }

  showDetails(id: number) {
    this.selectOneById(id);
    this.bsOffcanvasRef = this.bsOffcanvasService.open(HousingViewComponent, {
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

  private selectOneById(id: number|null) {
    this.store.dispatch(HousingPageActions.selectOne({ id: id }));
  }
}
