import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import Joi from 'joi';
import { Observable, Subscription } from 'rxjs';
import { CreateContractDto, CreateContractFormType } from 'src/app/shared/dto/contract.dto';
import { Housing } from 'src/app/shared/models/housing.model';
import { Person } from 'src/app/shared/models/person.model';
import { joiValidatorFromSchema } from 'src/app/shared/validator/joi.validator';
import { ContractApiActions, ContractPageActions } from 'src/app/store/contract/contract.actions';
import * as ContractSelectors from 'src/app/store/contract/contract.selectors';
import { HousingPageActions } from 'src/app/store/housing/housing.actions';
import * as HousingSelectors from 'src/app/store/housing/housing.selectors';
import { PersonPageActions } from 'src/app/store/person/person.actions';
import * as PersonSelectors from 'src/app/store/person/person.selectors';

@Component({
  selector: 'app-contract-create',
  templateUrl: './create.component.html',
})
export class ContractCreateComponent implements OnInit, OnDestroy  {
  creating$: Observable<boolean>;
  housings$: Observable<Housing[]>;
  persons$: Observable<Person[]>;

  form: FormGroup;
  subscriptions: Record<string, Subscription> = {};

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private actions$: Actions,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.creating$ = this.store.select(ContractSelectors.selectCreating);
    this.housings$ = this.store.select(HousingSelectors.selectAll);
    this.persons$ = this.store.select(PersonSelectors.selectAll);

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
    this.store.dispatch(HousingPageActions.loadAll({ params: { size: 1000 } }));
    this.store.dispatch(PersonPageActions.loadAll({ params: { size: 1000 } }));
  }

  private buildForm() {
    this.form = this.fb.group({
      haveLeaseNumber: [false],
      numeroExterneBail: [],
      dateSignatureContrat: [],
      dateDebutContrat: [],
      montantPasDePorte: [0],
      montantCaution: [0],
      montantAvance: [0],
      observation: [],
      envoiSms: [false],
      envoiEmail: [false],
      habitationId: [''],
      personneId: [''],
    }, {
      validators: joiValidatorFromSchema(Joi.object({
        habitationId: Joi.string().required(),
        personneId: Joi.string().required(),
        solde: Joi.number().optional(),
        montantPasDePorte: Joi.number().optional(),
        montantCaution: Joi.number().optional(),
        montantAvance: Joi.number().optional(),
      })),
    });
  }

  get f() {
    return this.form.getRawValue() as CreateContractFormType;
  }


  private createSuccessResultAction() {
    this.subscriptions['createSuccessContract'] = this.actions$.pipe(
      ofType(ContractApiActions.createSuccess),
    ).subscribe(() => {
      this.router.navigate(['/contracts']);
    });
  }

  onSubmit() {
    if (!this.form.valid) return false;
    const dto: CreateContractDto = this.getDtoFromFormType();
    this.store.dispatch(ContractPageActions.create({ dto }));
  }

  private getDtoFromFormType(): CreateContractDto {
    let habitationId: number|null = parseInt(String(this.f.habitationId));
    habitationId = isNaN(habitationId) ? null : habitationId;

    const dto: CreateContractDto =  {
      // numeroExterneBail: this.f.numeroExterneBail,
      dateSignatureContrat: this.f.dateSignatureContrat,
      dateDebutContrat: this.f.dateDebutContrat,
      montantPasDePorte: this.f.montantPasDePorte,
      montantCaution: this.f.montantCaution,
      montantAvance: this.f.montantAvance,
      observation: this.f.observation,
      envoiSms: this.f.envoiSms,
      envoiEmail: this.f.envoiEmail,
      habitation: habitationId ? { id: habitationId } : null,
      personne: this.f.personneId ? { id: this.f.personneId} : null,
    };

    if (this.f.haveLeaseNumber) {
      dto.numeroExterneBail = this.f.numeroExterneBail;
    }

    return dto;
  }
}
