import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <app-nav></app-nav>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
})
export default class AppComponent {

}
