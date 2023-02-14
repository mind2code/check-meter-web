import { Component, EventEmitter, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import {Personne} from "../models/personne.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import { Tenant } from 'src/app/shared/models/tenant.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import * as TenantSelectors from 'src/app/store/tenant/tenant.selectors';
import * as PersonSelectors from 'src/app/store/person/person.selectors';
import { TenantPageActions } from 'src/app/store/tenant/tenant.actions';
import { Person } from 'src/app/shared/models/person.model';
import { PersonApiActions, PersonPageActions } from 'src/app/store/person/person.actions';

@Component({
  selector: 'app-locataire-details',
  templateUrl: './locataire-details.component.html',
  styleUrls: ['./locataire-details.component.scss'],
})
export class LocataireDetailsComponent implements OnInit, OnDestroy {
  private readonly routerIdParam = 'tenantId';

  person$: Observable<Person|undefined|null>

  detailPersonneForm: FormGroup;
  event: EventEmitter<any> = new EventEmitter();
  modalRef?: BsModalRef;

  subscriptions: Record<string, Subscription> = {};

  constructor(
    private fb: FormBuilder,
    private bsModalService: BsModalService,
    private store: Store,
    private actions$: Actions,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(TenantPageActions.loadOneFromRouter({ paramName: this.routerIdParam }));
    this.person$ = this.store.select(PersonSelectors.selectCurrent);

    this.subscriptions['loadOneSuccessPerson'] = this.actions$.pipe(
      ofType(PersonApiActions.loadOneSuccess),
    ).subscribe(({ item }) => {
      this.store.dispatch(PersonPageActions.selectOne({ id: item.id }));
    });

    this.detailPersonneForm = this.fb.group({
      nom: [''],
      prenoms: [''],
      nomJeuneFille: [''],
      dateNaissance: [],
      lieuNaissance: [],
      observation: ['']
    });
  }

  ngOnDestroy(): void {
    for (const subscription of Object.values(this.subscriptions)) {
      subscription.unsubscribe();
    }
  }

  get f() {
    return this.detailPersonneForm.getRawValue();
  }

  loadDetailsPersonne(locataire: Personne) {
    this.detailPersonneForm.patchValue({
      nom: locataire.nom,
      prenoms: locataire.prenoms
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.bsModalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

}
