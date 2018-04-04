import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Inject,
  OnDestroy,
  InjectionToken,
  Output,
  ViewChild
} from '@angular/core';
import pikaday = require('pikaday');
import 'pikaday/css/pikaday.css';
import * as format from 'date-fns/format';

export const pikadayToken = new InjectionToken<string>('pikaday');

@Component({
  selector: 'datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css'],
  providers: [{ provide: pikadayToken, useValue: pikaday }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class DatepickerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('input') private inputEl: ElementRef;
  private datepicker: Pikaday;

  @Input() format = 'DD/MM/YYYY';
  @Input() value: string;
  @Input() showOnInit = false;
  @Output() onChange = new EventEmitter<string>();

  constructor(@Inject(pikadayToken) private pikaday) {}

  ngAfterViewInit() {
    const input = this.inputEl.nativeElement;
    this.datepicker = new this.pikaday({
      field: input,
      format: this.format,
      onSelect: (date: Date) => {
        const formattedDate = format(date, this.format);
        this.onChange.emit(formattedDate);
      }
    });

    if (this.showOnInit) this.datepicker.show();
  }

  ngOnDestroy() {
    this.datepicker.destroy();
  }
}
