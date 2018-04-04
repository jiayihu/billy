import { Component } from '@angular/core';
const notFoundSvg = require('./404.svg');

@Component({
  selector: 'not-found',
  template: `
    <img class="not-found" src="${notFoundSvg}" alt="404" />
    <p class="warning">Ooops. The page you were looking for doesn't exist.</p>
    <p><a routerLink="/">Take me back to the home page</a></p>
  `,
  styleUrls: ['./not-found.component.css']
})
export default class NotFoundComponent {}
