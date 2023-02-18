import { Component, OnDestroy, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import { Store } from '@ngrx/store';
import * as RentReceiptSelectors from 'src/app/store/rent-receipt/rent-receipt.selectors';
import * as ExpiryNoticeSelectors from 'src/app/store/expiry-notice/expiry-notice.selectors';
import { ExpiryNotice } from 'src/app/shared/models/expiry-notice.model';
import { ExpiryNoticePageActions } from 'src/app/store/expiry-notice/expiry-notice.actions';
import { NgbActiveOffcanvas, NgbOffcanvas, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { RentReceiptApiActions, RentReceiptPageActions } from 'src/app/store/rent-receipt/rent-receipt.actions';
import { joiValidatorFromSchema } from 'src/app/shared/validator/joi.validator';
import Joi from 'joi';
import { CreateRentReceiptDto } from 'src/app/shared/dto/rent-receipt.dto';
import { SettlementType } from 'src/app/shared/models/rent-receipt.model';

@Component({
  selector: 'app-expiry-notice-make-payment',
  templateUrl: './make-payment.component.html',
})
export class ExpiryNoticeMakePaymentComponent implements OnInit, OnDestroy {
  expiryNotice$: Observable<ExpiryNotice|null|undefined>;
  creating$: Observable<boolean>;
  settlementTypes$: Observable<SettlementType[]>;

  paymentForm: FormGroup;
  expiryNotice: ExpiryNotice|null|undefined;

  subscriptions: Record<string, Subscription> = {};

  constructor(
    private store: Store,
    private fb: FormBuilder,
    public bsActiveOffcanvas: NgbActiveOffcanvas,
    private actions$: Actions,
  ) {}

  ngOnInit(): void {
    this.expiryNotice$ = this.store.select(ExpiryNoticeSelectors.selectCurrent);
    this.creating$ = this.store.select(RentReceiptSelectors.selectCreating);
    this.subscriptions['selectCurrentExpiryNotice'] = this.expiryNotice$
      .subscribe((value) => {
        this.expiryNotice = value;
        this.buildForm();
      })
    ;
    this.subscriptions['createSuccessRentReceipt'] = this.actions$.pipe(
      ofType(RentReceiptApiActions.createSuccess)
    ).subscribe(() => this.onClose('success'));

  }

  ngOnDestroy(): void {
    for (const subscription of Object.values(this.subscriptions)) {
      subscription.unsubscribe();
    }
  }

  private buildForm() {
    this.paymentForm = this.fb.group({
      montant: [new FormControl({ value: '', disabled: (this.expiryNotice?.loyerRestant || 0) <= 0 })],
      observation: ['']
    }, {
      validators: joiValidatorFromSchema(Joi.object({
        montant: Joi.number().positive().max(this.expiryNotice?.loyerRestant ?? 0),
      }))
    });
  }

  get f() {
    return this.paymentForm.getRawValue();
  }

  onSubmit() {
    if(this.paymentForm.valid) {
      const dto = {
        montantRegle: this.f.montant,
        observation: this.f.observation,
        avisEcheance: {
          id: this.expiryNotice?.id
        },
      } as CreateRentReceiptDto;

      this.store.dispatch(RentReceiptPageActions.create({ dto }));
    }
  }

  onClose(reason?: string) {
    if (reason === 'success') {
      this.bsActiveOffcanvas.close(reason)
    } else {
      this.bsActiveOffcanvas.dismiss(reason || 'close')
    }
  }
}
