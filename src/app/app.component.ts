import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import NavComponent from './components/nav.component';
import DashboardComponent from '../features/dashboard/dashboard.component';
import SignupComponent from '../features/auth/signup/signup.component';

@Component({
  precompile: [DashboardComponent, SignupComponent],
  selector: 'app',
  template: `
    <app-nav></app-nav>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  directives: [ROUTER_DIRECTIVES, NavComponent],
})
export default class AppComponent {

}
