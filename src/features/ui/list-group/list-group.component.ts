import { Component } from '@angular/core';

@Component({
  selector: 'list-group',
  template: `
    <ul class="list-group"><ng-content></ng-content><ul>
  `
})
export default class ListGroupComponent {}
