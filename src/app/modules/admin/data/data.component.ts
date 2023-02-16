import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

type Tabs = 'overview' | 'person';

@Component({
  selector: 'app-admin-data',
  templateUrl: './data.component.html',
})
export class AdminDataComponent implements OnInit, OnDestroy {
  activeTab: Tabs = 'overview';

  subscriptions: Record<string, Subscription> = {};

  constructor() {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    for (const subscription of Object.values(this.subscriptions)) {
      subscription.unsubscribe();
    }
  }

  setActiveTab(tab: Tabs) {
    this.activeTab = tab;
  }
}
