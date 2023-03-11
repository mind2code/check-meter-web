import { Component, OnDestroy, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import { Store } from '@ngrx/store';
import * as ContractSelectors from 'src/app/store/contract/contract.selectors';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Contract } from 'src/app/shared/models/contract.model';

@Component({
  selector: 'app-contract-view',
  templateUrl: './view.component.html',
})
export class ContractViewComponent implements OnInit, OnDestroy {
  contract$: Observable<Contract|null|undefined>;

  subscriptions: Record<string, Subscription> = {};

  constructor(
    private store: Store,
    public bsActiveOffcanvas: NgbActiveOffcanvas,
  ) {}

  ngOnInit(): void {
    this.contract$ = this.store.select(ContractSelectors.selectCurrent);
  }

  ngOnDestroy(): void {
    for (const subscription of Object.values(this.subscriptions)) {
      subscription.unsubscribe();
    }
  }

  onClose(reason?: string) {
    if (reason === 'success') {
      this.bsActiveOffcanvas.close(reason)
    } else {
      this.bsActiveOffcanvas.dismiss(reason || 'close')
    }
  }
}
