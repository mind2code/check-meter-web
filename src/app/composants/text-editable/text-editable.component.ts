import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-text-editable',
  templateUrl: './text-editable.component.html',
  styleUrls: ['./text-editable.component.scss']
})
export class TextEditableComponent implements OnInit {

  @Input() text: string;

  editmode = false;
  editText = '';

  constructor() { }

  edit() {
    this.editmode = true;
    this.editText = this.text;
  }

  save() {
    this.editmode = false;
    this.text = this.editText;
  }

  cancel() {
    this.editmode = false;
    this.editText = '';
  }

  ngOnInit(): void {
  }

}
