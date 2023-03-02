import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import Joi from 'joi';
import { Observable, Subscription } from 'rxjs';
import { CreateHousingDto, CreateHousingFormType } from 'src/app/shared/dto/housing.dto';
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
      localisation: [],
      superficie: [],
      longitude: [],
      latitude: [],
      description: [],
      typeHabitationId: [''],
    }, {
      validators: joiValidatorFromSchema(Joi.object({
        typeHabitationId: Joi.string().required(),
        localisation: Joi.string().required(),
        superficie: Joi.number(),
        longitude: Joi.number(),
        latitude: Joi.number(),
      })),
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

    const dto: CreateHousingDto =  {
      localisation: this.f.localisation,
      superficie: this.f.superficie,
      longitude: this.f.longitude,
      latitude: this.f.latitude,
      description: this.f.description,
      typeHabitation: typeHabitationId ? { id: typeHabitationId } : null,
    };

    return dto;
  }
}
