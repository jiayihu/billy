import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon',
  template: require('./icon.component.html'),
  styles: [require('./icon.component.css')],
})
export default class IconComponent {
  @Input() name: string;
  @Input() size: number;

  classnames() {
    return {
      icon: true,
      lnr: true,
      [`lnr-${this.name}`]: true,
    };
  }
}
