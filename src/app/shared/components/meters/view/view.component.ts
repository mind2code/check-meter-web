import { Component, OnDestroy, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import { Store } from '@ngrx/store';
import * as MeterSelectors from 'src/app/store/meters/meters.selectors';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Meters } from 'src/app/shared/models/meter.model';
import { MapOptions, latLng, marker, tileLayer } from 'leaflet';
import { defaultTitleLayer, leafletHousingIcon } from 'src/app/shared/helpers/leaflet';

type Tabs = 'overview' | 'map';

@Component({
  selector: 'app-meter-view',
  templateUrl: './view.component.html',
})
export class MeterViewComponent implements OnInit, OnDestroy {
  meter$: Observable<Meters|null|undefined>;

  activeTab: Tabs = 'overview';
  mapOptions: MapOptions;

  subscriptions: Record<string, Subscription> = {};

  constructor(
    private store: Store,
    public bsActiveOffcanvas: NgbActiveOffcanvas,
  ) {}

  ngOnInit(): void {
    this.meter$ = this.store.select(MeterSelectors.selectCurrent);
    this.subscriptions['meterSelected'] = this.meter$.subscribe((value) => {
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

  private buildMapOptions(meter: Meters) {
    let lat = Number(meter.coordonnees.latitude);
    let lng = Number(meter.coordonnees.longitude);
    this.mapOptions = {
      layers: [
        defaultTitleLayer,
      ],
    };

    if (!(isNaN(lat) || isNaN(lng))) {
      const coordinates = latLng(lat, lng);
      const mapMarker = marker(coordinates, {
        title: meter.compteur,
        icon: leafletHousingIcon(),
      });
      this.mapOptions.layers?.push(mapMarker);
      this.mapOptions.center = coordinates;
      this.mapOptions.zoom = 17;
    }
  }
}
