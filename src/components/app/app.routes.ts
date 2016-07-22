import { provideRouter, RouterConfig } from '@angular/router';
import DashboardComponent from '../dashboard/dashboard';
import HeroesComponent from '../heroes/heroes';
import HeroDetailComponent from '../hero-detail/hero-detail';

const routes: RouterConfig = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'heroes',
    component: HeroesComponent,
  },
  {
    path: 'detail/:id',
    component: HeroDetailComponent,
  }
];

export const appRouterPrividers = [
  provideRouter(routes)
];
