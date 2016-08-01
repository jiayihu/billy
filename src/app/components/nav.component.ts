import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'app-nav',
  template: require('./nav.component.html'),
  directives: [ROUTER_DIRECTIVES],
})
export default class NavComponent {

}
