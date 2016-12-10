import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  SimpleChange,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'input-edit',
  template: require('./input-edit.component.html'),
  styles: [require('./input-edit.component.css')],
})
export default class InputEditComponent {
  private isEditing: boolean = false;
  private currentValue: string;
  // @NOTE: @ViewChild returns always undefined with *ngIf
  // @see {http://stackoverflow.com/questions/34947154/angular-2-viewchild-annotation-returns-undefined}
  @ViewChildren('input')
  private childQuery: QueryList<ElementRef>;
  private inputEl: ElementRef;

  @Input() initialValue: string;
  @Input() charsLength: number = 20;
  @Output() onChange = new EventEmitter<string>();

  ngOnChanges(changes: { initialValue: SimpleChange }) {
    if (changes.initialValue.previousValue !== changes.initialValue.currentValue) {
      this.currentValue = changes.initialValue.currentValue;
    }
  }

  ngAfterViewInit() {
    this.childQuery.changes.subscribe((comps: QueryList<ElementRef>) => {
      this.inputEl = comps.first;
    });
  }

  ngAfterViewChecked() {
    if (this.inputEl) this.inputEl.nativeElement.focus();
  }

  handleChange(value: string) {
    this.isEditing = false;
    this.onChange.emit(value);
  }

  handleStartEdit() {
    this.isEditing = true;
  }
}
