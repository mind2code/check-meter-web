import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-data-status',
  templateUrl: './status.component.html',
})
export class DataStatusComponent implements OnInit, OnDestroy {


  subscriptions: Record<string, Subscription> = {};

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    for (const subscription of Object.values(this.subscriptions)) {
      subscription.unsubscribe();
    }
  }

}
