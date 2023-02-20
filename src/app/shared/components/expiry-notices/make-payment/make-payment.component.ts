import { Component, OnDestroy, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import { Store } from '@ngrx/store';
import * as RentReceiptSelectors from 'src/app/store/rent-receipt/rent-receipt.selectors';
import * as ExpiryNoticeSelectors from 'src/app/store/expiry-notice/expiry-notice.selectors';
import * as SettlementTypeSelectors from 'src/app/store/settlement-type/settlement-type.selectors';
import { ExpiryNotice } from 'src/app/shared/models/expiry-notice.model';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { RentReceiptApiActions, RentReceiptPageActions } from 'src/app/store/rent-receipt/rent-receipt.actions';
import { joiValidatorFromSchema } from 'src/app/shared/validator/joi.validator';
import Joi from 'joi';
import { CreateRentReceiptDto } from 'src/app/shared/dto/rent-receipt.dto';
import { SettlementType } from 'src/app/shared/models/rent-receipt.model';

type PaymentFormType = {
  amount: number;
  type: string;
  observation: string
};

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
    this.settlementTypes$ = this.store.select(SettlementTypeSelectors.selectAll);
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
      amount: [new FormControl({ value: '', disabled: (this.expiryNotice?.loyerRestant || 0) <= 0 })],
      type: [''],
      observation: ['']
    }, {
      validators: joiValidatorFromSchema(Joi.object({
        amount: Joi.number().required().positive().max(this.expiryNotice?.loyerRestant ?? 0),
        type: Joi.string().required(),
      }))
    });
  }

  get f(): PaymentFormType {
    return this.paymentForm.getRawValue();
  }

  onSubmit() {
    if(this.paymentForm.valid) {
      const dto = {
        montantRegle: this.f.amount,
        observation: this.f.observation,
        avisEcheance: {
          id: this.expiryNotice?.id,
        },
        typeReglement: {
          id: parseInt(this.f.type),
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
