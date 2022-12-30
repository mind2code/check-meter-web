import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ICreateAccount} from "../../create-locataire.helper";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-personne-physique',
  templateUrl: './personne-physique.component.html',
  styleUrls: ['./personne-physique.component.scss']
})
export class PersonnePhysiqueComponent implements OnInit {

  @Input('updateParentModel') updateParentModel: (
    part: Partial<ICreateAccount>,
    isFormValid: boolean
  ) => void;

  personnePhysiqueForm: FormGroup;

  @Input() defaultValues: Partial<ICreateAccount>;
  private unsubscribe: Subscription[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.updateParentModel({}, true);
  }

  initForm() {
    this.personnePhysiqueForm = this.fb.group({
      civilite: [''],
      nom: [''],
      prenoms: [''],
      nomJeuneFille: [''],
      dateNaissance: [''],
      lieuNaissance: [''],
      genre: [''],
      situationMatrimoniale: ['']
    });

    const formChangesSubscr = this.personnePhysiqueForm.valueChanges.subscribe((val) => {
      console.log('val value => ' + JSON.stringify(val));
      this.updateParentModel(val, true);
    });
    this.unsubscribe.push(formChangesSubscr);
  }

  get f() { return this.personnePhysiqueForm.controls; }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
