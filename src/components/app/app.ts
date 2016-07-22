import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import DashboardComponent from '../dashboard/dashboard';
import HeroesComponent from '../heroes/heroes';
import { HeroService } from '../../services/hero';
import Hero from '../../entities/hero';

@Component({
  selector: 'app',
  styleUrls: ['src/components/app/app.css'],
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['/dashboard']" routerLinkActive="active">Dashboard</a>
      <a [routerLink]="['/heroes']" routerLinkActive="active">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES],
  precompile: [DashboardComponent, HeroesComponent],
  providers: [HeroService],
})
export default class AppComponent {
  title = 'Tour of Heroes';
}
