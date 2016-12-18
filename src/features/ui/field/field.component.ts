import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IField, ISelectField } from '../../../services/form-builder.service';

@Component({
  selector: 'field',
  templateUrl: './field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FieldComponent {
  @Input() form: FormGroup;
  @Input() field: IField | ISelectField;
  @Input() inputClassName: string = 'col-sm-8';

  handleChange() {
    const field = this.field;

    if (field.onChange) {
      // @TODO: remove value formatting after ControlValueAccessor implementation with InputEdit
      const rawValue: string = this.form.controls[field.name].value;
      let formattedValue: any = rawValue;

      if (field.controlType === 'number') formattedValue = Number(rawValue);

      field.onChange(formattedValue);
    }
  }
}
