import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
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
import * as IdentityDocumentTypeSelectors from 'src/app/store/identity-document-type/identity-document-type.selectors';
import * as PersonTypeSelectors from 'src/app/store/person-type/person-type.selectors';
import { Civility, Gender, MaritalSituation, PersonType } from 'src/app/shared/models/person.model';
import { Country } from 'src/app/shared/models/country.model';
import { IdentityDocumentType } from 'src/app/shared/models/identity-document.model';
import { CivilityPageActions } from 'src/app/store/civility/civility.actions';
import { GenderPageActions } from 'src/app/store/gender/gender.actions';
import { CountryPageActions } from 'src/app/store/country/country.actions';
import { IdentityDocumentTypePageActions } from 'src/app/store/identity-document-type/identity-document-type.actions';
import { MaritalSituationPageActions } from 'src/app/store/marital-situation/marital-situation.actions';
import { TenantApiActions, TenantPageActions } from 'src/app/store/tenant/tenant.actions';
import { Router } from '@angular/router';
import { PersonTypePageActions } from 'src/app/store/person-type/person-type.actions';

@Component({
  selector: 'app-tenant-create',
  templateUrl: './create.component.html',
})
export class TenantCreateComponent implements OnInit, OnDestroy {
  creating$: Observable<boolean>;
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
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.creating$ = this.store.select(TenantSelectors.selectCreating);
    this.civilities$ = this.store.select(CivilitySelectors.selectAll);
    this.genders$ = this.store.select(GenderSelectors.selectAll);
    this.countries$ = this.store.select(CountrySelectors.selectAll);
    this.maritalSituations$ = this.store.select(MaritalSituationSelectors.selectAll);
    this.identityDocumentTypes$ = this.store.select(IdentityDocumentTypeSelectors.selectAll);
    this.personTypes$ = this.store.select(PersonTypeSelectors.selectAll);

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
    this.store.dispatch(CivilityPageActions.loadAll({ params: { size: 100 } }));
    this.store.dispatch(GenderPageActions.loadAll({ params: { size: 100 } }));
    this.store.dispatch(CountryPageActions.loadAll({ params: { size: 400 } }));
    this.store.dispatch(IdentityDocumentTypePageActions.loadAll({ params: { size: 400 } }));
    this.store.dispatch(MaritalSituationPageActions.loadAll({ params: { size: 400 } }));
    this.store.dispatch(PersonTypePageActions.loadAll({ params: { size: 400 } }));
  }

  private buildForm() {
    this.form = this.fb.group({
      nom: [],
      prenoms: [],
      nomJeuneFille: [],
      dateNaissance: [],
      lieuNaissance: [],
      civiliteId: [''],
      genreId: [''],
      nationaliteId: [''],
      situationMatrimonialeId: [''],
      typePersonneId: [''],
      carnetAdresse: this.fb.array([]),
      pieceIdentite: this.fb.array([]),
    }, {
      validators: joiValidatorFromSchema(Joi.object({
        nom: Joi.string().required(),
        typePersonneId: Joi.string().required(),
      })),
    });
  }

  get f() {
    return this.form.getRawValue() as CreateTenantFormType;
  }

  get carnetAdresse() {
    return this.form.get('carnetAdresse') as FormArray<FormGroup>;
  }

  get pieceIdentite() {
    return this.form.get('pieceIdentite') as FormArray<FormGroup>;
  }

  addAddressBook() {
    const addressBookForm = this.fb.group({
      adresseEmail: [],
      telephoneMobile: [],
      telephoneMobile2: [],
      telephoneFixe: [],
      ville: [],
      quartier: [],
      adresseGeographique: [],
      adressePostale: [],
    }, {
      validators: joiValidatorFromSchema(Joi.object({
      })),
    });

    this.carnetAdresse.push(addressBookForm);
  }

  removeAddressBook(index: number) {
    this.carnetAdresse.removeAt(index);
  }

  addIdentityDocument() {
    const identityDocumentForm = this.fb.group({
      numeroIdentite: [],
      numeroNNI: [],
      delivrePar: [],
      dateDelivrance: [],
      dateExpiration: [],
      typePieceIdentiteId: [''],
    }, {
      validators: joiValidatorFromSchema(Joi.object({
      })),
    });

    this.pieceIdentite.push(identityDocumentForm);
  }

  removeIdentityDocument(index: number) {
    this.pieceIdentite.removeAt(index);
  }

  private createSuccessResultAction() {
    this.subscriptions['createSuccessTenant'] = this.actions$.pipe(
      ofType(TenantApiActions.createSuccess),
    ).subscribe(() => {
      this.router.navigate(['/tenants']);
    });
  }

  onSubmit() {
    if (!this.form.valid) return false;
    const dto: CreateTenantDto = this.getDtoFromFormType();
    this.store.dispatch(TenantPageActions.create({ dto }));
  }

  private getDtoFromFormType(): CreateTenantDto {
    let civiliteId: number|null = parseInt(String(this.f.civiliteId));
    civiliteId = isNaN(civiliteId) ? null : civiliteId;

    let genreId: number|null = parseInt(String(this.f.genreId));
    genreId = isNaN(genreId) ? null : genreId;

    let nationaliteId: number|null = parseInt(String(this.f.nationaliteId));
    nationaliteId = isNaN(nationaliteId) ? null : nationaliteId;

    let situationMatrimonialeId: number|null = parseInt(String(this.f.situationMatrimonialeId));
    situationMatrimonialeId = isNaN(situationMatrimonialeId) ? null : situationMatrimonialeId;

    return {
      nom: this.f.nom,
      prenoms: this.f.prenoms,
      nomJeuneFille: this.f.nomJeuneFille,
      dateNaissance: this.f.dateNaissance,
      lieuNaissance: this.f.lieuNaissance,
      carnetAdresse: this.f.carnetAdresse,
      pieceIdentite: this.f.pieceIdentite.map((item) => ({
        numeroIdentite: item.numeroIdentite,
        numeroNNI: item.numeroNNI,
        delivrePar: item.delivrePar,
        dateDelivrance: item.dateDelivrance,
        dateExpiration: item.dateExpiration,
        typePieceIdentite: (isNaN(parseInt(String(item.typePieceIdentiteId)))) ? null : {
          id: parseInt(String(item.typePieceIdentiteId)),
        },
      })),
      typePersonne: {
        id: this.f.typePersonneId,
      },
      civilite: civiliteId ? { id: civiliteId } : null,
      genre: genreId ? { id: genreId} : null,
      situationMatrimoniale: situationMatrimonialeId ? { id: situationMatrimonialeId } : null,
      nationalite: nationaliteId ? { id: nationaliteId } : null,
    };
  }
}
