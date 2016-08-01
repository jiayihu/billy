import { provideRouter, RouterConfig } from '@angular/router';
import DashboardComponent from '../features/dashboard/dashboard.component';
import SignupComponent from '../features/auth/signup/signup.component';

const routes: RouterConfig = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    component: DashboardComponent,
    path: 'dashboard',
  },
  {
    component: SignupComponent,
    path: 'signup',
  },
];

const appRouterProviders = [provideRouter(routes)];

export default appRouterProviders;
