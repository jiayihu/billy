import { Component } from '@angular/core';
import { AuthModel } from '@services/models/';

@Component({
  selector: 'app',
  template: `
    <app-nav class="print-hidden" [isAuthenticated]="isAuthenticated"></app-nav>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
    <app-footer class="print-hidden"></app-footer>
    <simple-notifications [options]="notificationOptions"></simple-notifications>
  `,
  styleUrls: ['./app.component.css']
})
export default class AppComponent {
  notificationOptions = {
    position: ['top', 'right'],
    timeOut: 5 * 1000,
    showProgressBar: false,
    lastOnBottom: false
  };
  isAuthenticated: boolean;

  constructor(private authModel: AuthModel) {
    authModel.auth$.subscribe(auth => (this.isAuthenticated = auth.isAuthenticated));
  }
}
