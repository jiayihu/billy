import { Routes, RouterModule } from '@angular/router';
import DashboardComponent from '../features/dashboard/dashboard.component';
import SignupComponent from '../features/auth/signup/signup.component';

const routes: Routes = [
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

export const appRoutingProviders: any[] = [
];

export default RouterModule.forRoot(routes);
