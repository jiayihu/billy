import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IField, ISelectField } from '@services/form-builder.service';

@Component({
  selector: 'field',
  templateUrl: './field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class FieldComponent {
  @Input() form: FormGroup;
  @Input() field: IField | ISelectField;
  @Input() inputClassName = 'col-sm-8';
}
