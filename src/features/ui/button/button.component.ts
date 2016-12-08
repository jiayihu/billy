import { Component, Input } from '@angular/core';

@Component({
  selector: 'btn',
  template: require('./button.component.html'),
  styles: [require('./button.component.css')],
})
export default class BtnComponent {
  @Input('class') className:string = '';
  @Input() type: 'secondary' | 'primary' | 'link' = 'secondary';

  classnames() {
    return {
      btn: true,
      [`btn-${this.type}`]: true,
      [this.className]: true,
    };
  }
}
