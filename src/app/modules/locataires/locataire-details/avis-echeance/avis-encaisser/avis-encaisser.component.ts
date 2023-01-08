import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-avis-encaisser',
  templateUrl: './avis-encaisser.component.html',
  styleUrls: ['./avis-encaisser.component.scss']
})
export class AvisEncaisserComponent implements OnInit {

  event: EventEmitter<any> = new EventEmitter();
  paymentForm: FormGroup;
  constructor(private fb: FormBuilder,
              private bsModalRef: BsModalRef) { }

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
    if(this.paymentForm.valid) {
      this.event.emit('OK');
      this.bsModalRef.hide();
    }
  }

  onClose() {
    this.bsModalRef.hide();
  }

}
