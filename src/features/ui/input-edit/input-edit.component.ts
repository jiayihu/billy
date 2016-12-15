import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChange,
} from '@angular/core';

@Component({
  selector: 'input-edit',
  template: require('./input-edit.component.html'),
  styles: [require('./input-edit.component.css')],
})
export default class InputEditComponent {
  private currentValue: string;

  @Input() initialValue: string;
  @Input() charsLength: number = 3;
  @Input() type: 'text' | 'number' | 'calendar' = 'text';
  @Output() onChange = new EventEmitter<any>();

  ngOnChanges(changes: { initialValue: SimpleChange }) {
    if (changes.initialValue.previousValue !== changes.initialValue.currentValue) {
      this.currentValue = changes.initialValue.currentValue;
    }
  }

  handleChange(value: string) {
    let formattedValue: any = value;
    if (this.type === 'number') formattedValue = Number(value);

    this.onChange.emit(formattedValue);
  }
}
