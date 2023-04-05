import { Component, OnDestroy, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import { Store } from '@ngrx/store';
import { pagination } from 'src/environments/environment';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';
import * as MeterSelectors from 'src/app/store/meters/meters.selectors';
import { PageEvent } from '@angular/material/paginator';
import { NgbOffcanvas, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { MeterViewComponent } from 'src/app/shared/components/meters/view/view.component';
import { MapOptions, latLng, marker, tileLayer } from 'leaflet';
import { Meters } from 'src/app/shared/models/meter.model';
import { MetersPageActions } from 'src/app/store/meters/meters.actions';

@Component({
  selector: 'app-meters',
  templateUrl: './meters.component.html',
  styleUrls: ['./meters.component.scss']
})
export class MetersComponent  implements OnInit, OnDestroy {

  meters$: Observable<Meters[]>;
  loading$: Observable<boolean>;
  totalRecords$: Observable<number>;

  displayedColumns: string[] = [
    "compteur", "dr", "secteur", "reference","reference_contrat", "nom", "prenoms", "contact",
    "longitude", "latitude", "actions"
  ];
  pageSizes: number[] = pagination.pageSizes || [];
  pageSize: number = pagination.perPage ?? 25;
  paginationQuery: PaginationQuery = {};

  bsOffcanvasRef: NgbOffcanvasRef;
  subscriptions: Record<string, Subscription> = {};
  mapOptions: MapOptions;

  constructor(
    private store: Store,
    private bsOffcanvasService: NgbOffcanvas,
  ) {}

  ngOnInit(): void {
    this.meters$ = this.store.select(MeterSelectors.selectAll);
    this.loading$ = this.store.select(MeterSelectors.selectLoading);
    this.totalRecords$ = this.store.select(MeterSelectors.selectTotalRecords);
    console.log(this.meters$);
    this.loadData();
  }

  ngOnDestroy(): void {
    for (const subscription of Object.values(this.subscriptions)) {
      subscription.unsubscribe();
    }
  }

  trackById(index: number, item: Meters): string {
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
    this.store.dispatch(MetersPageActions.loadAll({ params: this.paginationQuery }));
  }

  showDetails(id: string) {
    this.selectOneById(id);
    this.bsOffcanvasRef = this.bsOffcanvasService.open(MeterViewComponent, {
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

  private selectOneById(id: string|null) {
    this.store.dispatch(MetersPageActions.selectOne({ id: id }));
  }

}
