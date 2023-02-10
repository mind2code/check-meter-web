import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import  {FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { QuittanceLoyerService } from '../../../services/quittance-loyer.service';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { joiValidatorFromSchema } from 'src/app/shared/validator/joi.validator';
import Joi from "joi";
import { ExpiryNotice } from 'src/app/shared/models/expiry-notice.model';
import * as ExpiryNoticeSelector from 'src/app/store/expiry-notice/expiry-notice.selectors';
import { Actions, ofType } from '@ngrx/effects';
import { RentReceiptApiActions, RentReceiptPageActions } from 'src/app/store/rent-recipt/rent-receipt.actions';
import { CreateRentReceiptDto } from 'src/app/shared/dto/rent-receipt.dto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-avis-encaisser',
  templateUrl: './avis-encaisser.component.html',
  styleUrls: ['./avis-encaisser.component.scss']
})
export class AvisEncaisserComponent implements OnInit, OnDestroy {
  paymentForm: FormGroup;
  expiryNotice?: ExpiryNotice | null;
  creating: boolean = false;

  subscriptions: Record<string, Subscription> = {};

  constructor(
    private fb: FormBuilder,
    private quittanceLoyerService: QuittanceLoyerService,
    private readonly store: Store,
    private toastrService: ToastrService,
    public bsActiveOffcanvas: NgbActiveOffcanvas,
    private actions$: Actions,
  ) {}

  ngOnInit(): void {
    this.store.select(ExpiryNoticeSelector.selectCurrent).subscribe((expiryNotice) => {
        this.expiryNotice = expiryNotice;
    });

    this.subscriptions['createSuccess'] = this.actions$.pipe(
      ofType(RentReceiptApiActions.createSuccess)
    ).subscribe((value) => {
      this.creating = false
      this.onClose('success');
    });

    this.subscriptions['createFailed'] = this.actions$.pipe(
      ofType(RentReceiptApiActions.createFailed)
    ).subscribe((value) => {
      this.creating = false
    });

    this.paymentForm = this.fb.group({
      montant: [new FormControl({ value: '', disabled: (this.expiryNotice?.loyerRestant || 0) <= 0 })],
      observation: ['']
    }, {
      validators: joiValidatorFromSchema(Joi.object({
        montant: Joi.number().positive().max(this.expiryNotice?.loyerRestant ?? 0),
      }))
    });
  }

  ngOnDestroy(): void {
    for (const subscription of Object.values(this.subscriptions)) {
      subscription.unsubscribe();
    }
  }

  get f() {
    return this.paymentForm.getRawValue();
  }

  onSubmit() {
    if(this.paymentForm.valid) {
      this.creating = true;
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
