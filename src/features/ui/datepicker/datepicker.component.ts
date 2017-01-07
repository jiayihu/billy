import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Inject,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import * as moment from 'moment';
import pikaday = require('pikaday');
import 'pikaday/css/pikaday.css';

@Component({
  selector: 'datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css'],
  providers: [
    { provide: 'pikaday', useValue: pikaday },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DatepickerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('input')
  private inputEl: ElementRef;
  private datepicker: Pikaday;

  @Input() format: string = 'DD/MM/YYYY';
  @Input() value: string;
  @Input() showOnInit: boolean = false;
  @Output() onChange = new EventEmitter<string>();

  constructor(
    @Inject('pikaday') private pikaday,
  ) {}

  ngAfterViewInit() {
    const input = this.inputEl.nativeElement;
    this.datepicker = new this.pikaday({
      field: input,
      format: this.format,
      onSelect: (date: Date) => {
        const formattedDate = moment(date).format(this.format);
        this.onChange.emit(formattedDate);
      },
    });

    if (this.showOnInit) this.datepicker.show();
  }

  ngOnDestroy() {
    this.datepicker.destroy();
  }
}
