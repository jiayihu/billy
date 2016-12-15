import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

interface ISelectOption {
  name: string;
  value: string;
}

@Component({
  selector: 'select-list',
  template: require('./select-list.component.html'),
})
export default class SelectListComponent {
  @Input() addOption: boolean;
  @Input() addOptionText: string = 'Or add a new option';
  @Input() defaultText: string = 'Select an option';
  @Input() options: ISelectOption[];
  @Output() onChange = new EventEmitter<string>();

  @ViewChild('select')
  private selectEl: ElementRef;

  handleSelect(value: string): void {
    // @NOTE: default text option has value ''
    if (value) this.onChange.emit(value);

    // Reset the selection to default if 'add' option was selected
    if (value === 'add') this.selectEl.nativeElement.selectedIndex = 0;
  }
}
