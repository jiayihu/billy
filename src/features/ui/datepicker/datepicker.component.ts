import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import pikaday = require('pikaday');
import 'pikaday/css/pikaday.css';

@Component({
  selector: 'datepicker',
  template: require('./datepicker.component.html'),
  styles: [require('./datepicker.component.css')],
})
export default class DatepickerComponent implements AfterViewInit {
  @ViewChild('input')
  private inputEl: ElementRef;
  private datepicker: Pikaday;

  @Input() format: string = 'DD/MM/YYYY';
  @Input() value: string;
  @Output() onChange = new EventEmitter<string>();

  ngAfterViewInit() {
    const input = this.inputEl.nativeElement;
    this.datepicker = new pikaday({
      field: input,
      format: this.format,
    });
  }

  handleDateChange(date: string) {
    this.onChange.emit(date);
  }
}
