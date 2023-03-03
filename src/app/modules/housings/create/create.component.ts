import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import Joi from 'joi';
import { MapOptions, Marker, latLng, marker, tileLayer } from 'leaflet';
import { pick } from 'lodash';
import { Observable, Subscription } from 'rxjs';
import { CreateHousingDto, CreateHousingFormType } from 'src/app/shared/dto/housing.dto';
import { defaultTitleLayer, getUserCoordinates, leafletHousingIcon } from 'src/app/shared/helpers/leaflet';
import { HousingType } from 'src/app/shared/models/housing.model';
import { joiValidatorFromSchema } from 'src/app/shared/validator/joi.validator';
import { HousingTypePageActions } from 'src/app/store/housing-type/housing-type.actions';
import * as HousingTypeSelectors from 'src/app/store/housing-type/housing-type.selectors';
import { HousingApiActions, HousingPageActions } from 'src/app/store/housing/housing.actions';
import * as HousingSelectors from 'src/app/store/housing/housing.selectors';

@Component({
  selector: 'app-housing-create',
  templateUrl: './create.component.html',
})
export class HousingCreateComponent implements OnInit, OnDestroy {
  creating$: Observable<boolean>;
  housingTypes$: Observable<HousingType[]>;

  mapOptions: MapOptions;
  mapCoordinatesLoaded: boolean = false
  mapMarker: Marker;
  form: FormGroup;
  subscriptions: Record<string, Subscription> = {};

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private actions$: Actions,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.creating$ = this.store.select(HousingSelectors.selectCreating);
    this.housingTypes$ = this.store.select(HousingTypeSelectors.selectAll);

    this.loadData();
    this.buildForm();
    this.buildMapOptions();
    this.createSuccessResultAction();
  }

  ngOnDestroy(): void {
    for (const subscription of Object.values(this.subscriptions)) {
      subscription.unsubscribe();
    }
  }

  private loadData() {
    this.store.dispatch(HousingTypePageActions.loadAll({ params: { size: 1000 } }));
  }

  private buildForm() {
    this.form = this.fb.group({
      identifiant: [],
      localisation: [],
      superficie: [],
      longitude: [],
      latitude: [],
      description: [],
      typeHabitationId: [''],
    }, {
      validators: joiValidatorFromSchema(Joi.object({
        identifiant: Joi.string().required(),
        typeHabitationId: Joi.string().required(),
        localisation: Joi.string().required(),
        superficie: Joi.number(),
        longitude: Joi.number(),
        latitude: Joi.number(),
      })),
    });
  }

  /**
   * Update map marker position on user change lat & lng form input
   */
  onLatLngInput() {
    if (this.mapMarker) {
      const lat = Number(this.f.latitude);
      const lng = Number(this.f.longitude);
      if (!(isNaN(lat) || isNaN(lng))) {
        this.mapMarker.setLatLng(latLng(lat, lng));
      }
    }
  }

  private buildMapOptions() {
    getUserCoordinates().then((coordinates: any) => {
      // Set initial coordinates
      this.form.get('latitude')?.setValue(coordinates.lat);
      this.form.get('longitude')?.setValue(coordinates.lng);

      this.mapMarker = marker(coordinates, {
        icon: leafletHousingIcon(),
        draggable: true,
      });

      this.mapOptions = {
        layers: [
          defaultTitleLayer,
          this.mapMarker
        ],
        zoom: 6,
        center: coordinates
      };

      // Get marker coordinates on dragging
      this.mapMarker.on('drag', (event: any) => {
        this.form.get('latitude')?.setValue(event.latlng.lat);
        this.form.get('longitude')?.setValue(event.latlng.lng);
      });
    }).finally(() => {
      this.mapCoordinatesLoaded = true;
    });
  }

  get f() {
    return this.form.getRawValue() as CreateHousingFormType;
  }


  private createSuccessResultAction() {
    this.subscriptions['createSuccessHousing'] = this.actions$.pipe(
      ofType(HousingApiActions.createSuccess),
    ).subscribe(() => {
      this.router.navigate(['/housings']);
    });
  }

  onSubmit() {
    if (!this.form.valid) return false;
    const dto: CreateHousingDto = this.getDtoFromFormType();
    this.store.dispatch(HousingPageActions.create({ dto }));
  }

  private getDtoFromFormType(): CreateHousingDto {
    let typeHabitationId: number|null = parseInt(String(this.f.typeHabitationId));
    typeHabitationId = isNaN(typeHabitationId) ? null : typeHabitationId;

    const dto: CreateHousingDto =  pick(this.f, [
      'identifiant',
      'localisation',
      'superficie',
      'longitude',
      'latitude',
      'description',
    ]);
    dto.typeHabitation = typeHabitationId ? { id: typeHabitationId } : null;

    return dto;
  }
}
