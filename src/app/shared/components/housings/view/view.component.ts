import { Component, OnDestroy, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import { Store } from '@ngrx/store';
import * as HousingSelectors from 'src/app/store/housing/housing.selectors';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Housing } from 'src/app/shared/models/housing.model';
import { MapOptions, latLng, marker, tileLayer } from 'leaflet';

type Tabs = 'overview' | 'map';

@Component({
  selector: 'app-housing-view',
  templateUrl: './view.component.html',
})
export class HousingViewComponent implements OnInit, OnDestroy {
  housing$: Observable<Housing|null|undefined>;

  activeTab: Tabs = 'overview';
  mapOptions: MapOptions;

  subscriptions: Record<string, Subscription> = {};

  constructor(
    private store: Store,
    public bsActiveOffcanvas: NgbActiveOffcanvas,
  ) {}

  ngOnInit(): void {
    this.housing$ = this.store.select(HousingSelectors.selectCurrent);
    this.subscriptions['housingSelected'] = this.housing$.subscribe((value) => {
      if (value) {
        this.buildMapOptions(value);
      }
    });
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

  setActiveTab(tab: Tabs) {
    this.activeTab = tab;
  }

  private buildMapOptions(housing: Housing) {
    let lat = Number(housing.latitude);
    let lng = Number(housing.longitude);
    this.mapOptions = {
      layers: [
        tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }),
      ],
      zoom: 11,
    };

    if (!(isNaN(lat) || isNaN(lng))) {
      const coordinates = latLng(lat, lng);
      const mapMarker = marker(coordinates,);
      this.mapOptions.layers?.push(mapMarker);
      this.mapOptions.center = coordinates;
    }
  }

  openCollision(map : L.Map){
    setTimeout(function() {
      console.log('**** HousingViewComponent loading'); // TODO: Remove
      map.invalidateSize();
    }, 10);
  }
}
