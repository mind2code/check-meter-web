import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BsModalRef} from "ngx-bootstrap/modal";
import { QuittanceLoyerService } from '../../../services/quittance-loyer.service';
import { Store } from '@ngrx/store';
import { AvisEcheance } from '../../../models/avis-echeance.model';
import { avisEcheancesFeature } from '../../../store/reducers/avis-echeances.reducer';

@Component({
  selector: 'app-avis-encaisser',
  templateUrl: './avis-encaisser.component.html',
  styleUrls: ['./avis-encaisser.component.scss']
})
export class AvisEncaisserComponent implements OnInit {

  event: EventEmitter<any> = new EventEmitter();
  paymentForm: FormGroup;
  avisEcheance: AvisEcheance | undefined;
  constructor(
    private fb: FormBuilder,
    private bsModalRef: BsModalRef,
    private quittanceLoyerService: QuittanceLoyerService,
    private readonly store: Store,
  ) {
    this.store.select(avisEcheancesFeature.selectSelected).subscribe((selected) => this.avisEcheance = selected)
  }

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      montant: ['', Validators.required],
      observation: ['']
    });
  }

  get f() {
    return this.paymentForm.getRawValue();
  }

  onSubmit() {
    console.log('**** avisEcheance', this.avisEcheance);
    if(this.paymentForm.valid) {
      this.quittanceLoyerService.create(this.f).subscribe({
        next: (value) => {
          console.log('[created quittance-loyers]', value);
          this.event.emit('OK');
          this.onClose();
        },
        error: (err) => {
          console.error('[creating quittance-loyers]', err);
          alert('Une erreur est servune');
        },
      })
    }
  }

  onClose() {
    this.bsModalRef.hide();
  }

}
