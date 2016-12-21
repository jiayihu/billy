import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <app-nav></app-nav>
    <div class="container">
      <router-outlet></router-outlet>
      <app-footer></app-footer>
    </div>
    <simple-notifications [options]="notificationOptions"></simple-notifications>
  `,
})
export default class AppComponent {
  notificationOptions = {
    position: ['top', 'right'],
    timeOut: 10 * 1000,
    showProgressBar: false,
    lastOnBottom: false,
  };
}
