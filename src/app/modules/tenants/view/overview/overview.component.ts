import { Component, OnDestroy, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import { Store } from '@ngrx/store';
import * as TenantSelectors from 'src/app/store/tenant/tenant.selectors';
import { Tenant } from 'src/app/shared/models/tenant.model';
import { PageInfoService } from 'src/app/_template/layout';

@Component({
  selector: 'app-tenant-view-overview',
  templateUrl: './overview.component.html',
})
export class TenantViewOverviewComponent implements OnInit, OnDestroy {
  private readonly routerIdParam = 'tenantId';
  tenant$: Observable<Tenant|undefined|null>;

  subscriptions: Record<string, Subscription> = {};

  constructor(
    private store: Store,
    private pageInfo: PageInfoService,
  ) {}

  ngOnInit(): void {
    this.pageInfo.updateTitle(`Détails d'un locataire`);
    this.tenant$ = this.store.select(TenantSelectors.selectCurrent);
  }

  ngOnDestroy(): void {
    for (const subscription of Object.values(this.subscriptions)) {
      subscription.unsubscribe();
    }
  }
}
