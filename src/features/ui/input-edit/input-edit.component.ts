import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const DEFAULT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputEditComponent),
  multi: true
};

@Component({
  selector: 'input-edit',
  templateUrl: './input-edit.component.html',
  styleUrls: ['./input-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DEFAULT_VALUE_ACCESSOR]
})
export default class InputEditComponent implements ControlValueAccessor {
  // Function called to propagate change in the form and other controls when
  // InputEditComponent is used as FormControl
  private propagateChange: Function;
  onTouch: Function;

  @Input() initialValue: any = '';
  @Input() charsLength = 3;
  @Input() name = '';
  @Input() required = false;
  @Input() size: 'fluid' | 'auto' = 'auto';
  @Input() type: 'text' | 'number' | 'calendar' = 'text';
  @Output() onChange = new EventEmitter<any>();

  classnames(): Object {
    return {
      'input-edit': true,
      'form-control': true,
      'form-control--inline': this.size === 'auto'
    };
  }

  writeValue(value: any) {
    if (value) this.initialValue = value;
  }

  registerOnChange(fn: Function) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }

  handleChange(value: string = '') {
    let formattedValue: any = value;
    if (this.type === 'number') formattedValue = Number(value);

    if (this.propagateChange) this.propagateChange(formattedValue);
    else if (this.onChange.emit) this.onChange.emit(formattedValue);

    if (this.onTouch) this.onTouch();
  }
}
