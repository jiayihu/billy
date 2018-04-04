import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export default class NavComponent {
  @Input() isAuthenticated: boolean;
}
