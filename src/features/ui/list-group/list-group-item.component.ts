import { Component } from '@angular/core';

@Component({
  selector: 'list-group-item',
  template: `
    <li class="list-group-item"><ng-content></ng-content></li>
  `
})
export default class ListGroupItemComponent {}
