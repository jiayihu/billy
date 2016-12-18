import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'input-edit',
  templateUrl: './input-edit.component.html',
  styleUrls: ['./input-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InputEditComponent {
  @Input() initialValue: string;
  @Input() charsLength: number = 3;
  @Input() type: 'text' | 'number' | 'calendar' = 'text';
  @Output() onChange = new EventEmitter<any>();

  handleChange(value: string) {
    let formattedValue: any = value;
    if (this.type === 'number') formattedValue = Number(value);

    this.onChange.emit(formattedValue);
  }
}
