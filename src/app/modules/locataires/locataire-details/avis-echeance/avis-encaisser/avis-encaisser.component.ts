import {Component, EventEmitter, OnInit} from '@angular/core';
import  {FormBuilder, FormGroup } from "@angular/forms";
import { QuittanceLoyerService } from '../../../services/quittance-loyer.service';
import { Store } from '@ngrx/store';
import { AvisEcheance } from '../../../models/avis-echeance.model';
import { avisEcheancesFeature } from '../../../store/reducers/avis-echeances.reducer';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { joiValidatorFromSchema } from 'src/app/shared/validator/joi.validator';
import Joi from "joi";

@Component({
  selector: 'app-avis-encaisser',
  templateUrl: './avis-encaisser.component.html',
  styleUrls: ['./avis-encaisser.component.scss']
})
export class AvisEncaisserComponent implements OnInit {

  event: EventEmitter<any> = new EventEmitter();
  paymentForm: FormGroup;
  avisEcheance: AvisEcheance | undefined;
  creating: boolean = false;

  constructor(
    private fb: FormBuilder,
    private quittanceLoyerService: QuittanceLoyerService,
    private readonly store: Store,
    private toastrService: ToastrService,
    public bsActiveOffcanvas: NgbActiveOffcanvas,
  ) {
    this.store.select(avisEcheancesFeature.selectSelected)
      .subscribe((selected) => this.avisEcheance = selected);
  }

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      montant: [''],
      observation: ['']
    }, {
      validators: joiValidatorFromSchema(Joi.object({
        montant: Joi.number().positive().max(this.avisEcheance?.loyerRestant ?? 0),
      }))
    });
  }

  get f() {
    return this.paymentForm.getRawValue();
  }

  onSubmit() {
    if(this.paymentForm.valid) {
      const createQuittanceLoyersDto = {
        montantRegle: this.f.montant,
        observation: this.f.observation,
        avisEcheance: {
          id: this.avisEcheance?.id
        },
        // dateReglement: new Date().toISOString().split('T')[0],
      }
      this.creating = true;
      this.quittanceLoyerService.create(createQuittanceLoyersDto).subscribe({
        next: () => {
          this.toastrService.success('Encaissement effectué');
          // this.event.emit('OK');
          this.onClose('success');
        },
        error: (err) => {
          console.error('[creating quittance-loyers]', err);
          this.toastrService.error('Une erreur est servune');
        },
        complete: () => {
          this.creating = false
        }
      })
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
