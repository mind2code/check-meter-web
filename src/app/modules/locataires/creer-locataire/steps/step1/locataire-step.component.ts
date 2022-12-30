import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ICreateAccount } from '../../create-locataire.helper';

@Component({
  selector: 'app-locataire-step',
  templateUrl: './locataire-step.component.html',
})
export class LocataireStepComponent implements OnInit, OnDestroy {
  @Input('updateParentModel') updateParentModel: (
    part: Partial<ICreateAccount>,
    isFormValid: boolean
  ) => void;
  form: FormGroup;
  @Input() defaultValues: Partial<ICreateAccount>;
  private unsubscribe: Subscription[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    this.updateParentModel({}, true);
  }

  initForm() {
    this.form = this.fb.group({
      typePersonne: [this.defaultValues.accountType, [Validators.required]],

    });

    const formChangesSubscr = this.form.valueChanges.subscribe((val) => {
      console.log('val value => ' + JSON.stringify(val));
      this.updateParentModel(val, true);
    });
    this.unsubscribe.push(formChangesSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
