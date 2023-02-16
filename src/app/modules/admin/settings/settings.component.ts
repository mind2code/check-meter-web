import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

type Tabs = 'overview';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './settings.component.html',
})
export class SettingsDataComponent implements OnInit, OnDestroy {
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
