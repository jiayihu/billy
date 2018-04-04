import { Component, Input } from '@angular/core';

@Component({
  selector: 'alert',
  template: `
    <div [ngClass]="classnames()"><ng-content></ng-content></div>
  `
})
export default class AlertComponent {
  @Input() type: 'success' | 'info' | 'warning' | 'danger';

  classnames(): Object {
    return {
      alert: true,
      [`alert-${this.type}`]: this.type
    };
  }
}
