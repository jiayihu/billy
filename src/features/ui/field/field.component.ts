import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IField, ISelectField } from '../../../services/form-builder.service';

@Component({
  selector: 'field',
  template: require('./field.component.html'),
})
export default class FieldComponent {
  @Input() form: FormGroup;
  @Input() field: IField | ISelectField;
  @Input() inputClassName: string = 'col-sm-8';
}
