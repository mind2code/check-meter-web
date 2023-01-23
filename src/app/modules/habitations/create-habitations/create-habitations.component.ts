import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-habitations',
  templateUrl: './create-habitations.component.html',
  styleUrls: ['./create-habitations.component.scss']
})
export class CreateHabitationsComponent implements OnInit {

  @Input('achi') achiModel: { };
  formHabitation: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formHabitation = this.fb.group({
      habitation: ['', Validators.required],
      description: []
    });
  }

  get f() {
    return this.formHabitation.getRawValue();
  }

  onSubmit() {
    console.log('Form value -> ' + JSON.stringify(this.f.habitation));
  }

}
