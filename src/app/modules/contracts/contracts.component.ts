import { Component, OnDestroy, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import { Store } from '@ngrx/store';
import { pagination } from 'src/environments/environment';
import { PaginationQuery } from 'src/app/shared/requests/pagination.query';
import { Contract } from 'src/app/shared/models/contract.model';
import { ContractPageActions } from 'src/app/store/contract/contract.actions';
import * as ContractSelectors from 'src/app/store/contract/contract.selectors';
import { PageEvent } from '@angular/material/paginator';
import { NgbOffcanvas, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { ContractViewComponent } from 'src/app/shared/components/contracts/view/view.component';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
})
export class ContractsComponent implements OnInit, OnDestroy {
  contracts$: Observable<Contract[]>;
  loading$: Observable<boolean>;
  totalRecords$: Observable<number>;

  displayedColumns: string[] = [
    'identifiant', 'numeroExterneBail', 'solde', 'dateDebutContrat',
    'dateFinContrat', 'personne', 'habitation', 'actions'
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
    this.contracts$ = this.store.select(ContractSelectors.selectAll);
    this.totalRecords$ = this.store.select(ContractSelectors.selectTotalRecords);
    this.loading$ = this.store.select(ContractSelectors.selectLoading);

    this.loadData();
  }

  ngOnDestroy(): void {
    for (const subscription of Object.values(this.subscriptions)) {
      subscription.unsubscribe();
    }
  }

  trackById(index: number, item: Contract): string {
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
    this.store.dispatch(ContractPageActions.loadAll({ params: this.paginationQuery }));
  }

  showDetails(id: string) {
    this.selectOneById(id);
    this.bsOffcanvasRef = this.bsOffcanvasService.open(ContractViewComponent, {
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
    this.store.dispatch(ContractPageActions.selectOne({ id: id }));
  }
}
