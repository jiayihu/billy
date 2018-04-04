import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';

interface ISelectOption {
  name: string;
  value: string;
}

@Component({
  selector: 'select-list',
  templateUrl: './select-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class SelectListComponent {
  @Input() addOption: boolean;
  @Input() addOptionText = 'Or add a new option';
  @Input() defaultText = 'Select an option';
  @Input() options: ISelectOption[];
  @Input() resetAfterSelect = true;
  @Output() onChange = new EventEmitter<string>();

  @ViewChild('select') private selectEl: ElementRef;

  handleSelect(value: string): void {
    // @NOTE: default text option has value ''
    if (value) this.onChange.emit(value);

    if (value === 'add' || this.resetAfterSelect) this.selectEl.nativeElement.selectedIndex = 0;
  }
}
