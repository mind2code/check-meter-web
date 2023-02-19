import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import Joi from 'joi';
import { Observable, Subscription } from 'rxjs';
import { CreateTenantDto, CreateTenantFormType } from 'src/app/shared/dto/tenant.dto';
import { joiValidatorFromSchema } from 'src/app/shared/validator/joi.validator';
import * as TenantSelectors from 'src/app/store/tenant/tenant.selectors';
import * as CivilitySelectors from 'src/app/store/civility/civility.selectors';
import * as GenderSelectors from 'src/app/store/gender/gender.selectors';
import * as MaritalSituationSelectors from 'src/app/store/marital-situation/marital-situation.selectors';
import * as CountrySelectors from 'src/app/store/country/country.selectors';
import * as PersonTypeSelectors from 'src/app/store/person-type/person-type.selectors';
import * as IdentityDocumentTypeSelectors from 'src/app/store/identity-document-type/identity-document-type.selectors';
import { Civility, Gender, MaritalSituation, PersonType } from 'src/app/shared/models/person.model';
import { Country } from 'src/app/shared/models/country.model';
import { IdentityDocumentType } from 'src/app/shared/models/identity-document.model';

@Component({
  selector: 'app-tenant-create',
  templateUrl: './create.component.html',
})
export class TenantCreateComponent implements OnInit, OnDestroy {
  creating$: Observable<boolean>
  civilities$: Observable<Civility[]>;
  genders$: Observable<Gender[]>;
  countries$: Observable<Country[]>;
  personTypes$: Observable<PersonType[]>;
  identityDocumentTypes$: Observable<IdentityDocumentType[]>;
  maritalSituations$: Observable<MaritalSituation[]>;

  form: FormGroup;
  subscriptions: Record<string, Subscription> = {};

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private actions$: Actions,
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnDestroy(): void {
    for (const subscription of Object.values(this.subscriptions)) {
      subscription.unsubscribe();
    }
  }

  private buildForm() {
    this.form = this.fb.group({
      identifiant: [null],
      nom: [null],
      prenoms: [null],
      nomJeuneFille: [null],
      dateNaissance: [null],
      lieuNaissance: [null],
      description: [null],
      estActif: [true],
      civiliteId: [null],
      genreId: [null],
      nationaliteId: [null],
      situationMatrimonialeId: [null],
      typePersonneId: [null],
      carnetAdresse: this.fb.array([]),
      pieceIdentite: this.fb.array([]),
    }, {
      validators: joiValidatorFromSchema(Joi.object({
        identifiant: Joi.string().required(),
        nom: Joi.string().required(),
        dateNaissance: Joi.date().less('now'),
        estActif: Joi.boolean(),
      })),
    });
  }

  get f() {
    return this.form.getRawValue() as CreateTenantFormType;
  }

  get carnetAdresse() {
    return this.form.get('carnetAdresse') as FormArray<FormGroup>;
  }

  addCarnetAdresse() {
    const addressBookForm = this.fb.group({
      adresseEmail: [null],
      telephoneMobile: [null],
      telephoneMobile2: [null],
      telephoneFixe: [null],
      ville: [null],
      quartier: [null],
      adresseGeographique: [null],
      adressePostale: [null],
    }, {
      validators: joiValidatorFromSchema(Joi.object({
        adresseEmail: Joi.string(),
      })),
    });

    this.carnetAdresse.push(addressBookForm);
  }

  removeCarnetAdresse(index: number) {
    this.carnetAdresse.removeAt(index);
  }
}
