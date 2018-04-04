import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'btn',
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class BtnComponent {
  @Input() type: 'secondary' | 'primary' | 'link' = 'secondary';
  @Output() onClick = new EventEmitter<any>();

  classnames() {
    return {
      btn: true,
      [`btn-${this.type}`]: true
    };
  }

  handleClick(event) {
    this.onClick.emit(event);
  }
}
