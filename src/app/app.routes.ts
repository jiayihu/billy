import { Routes, RouterModule } from '@angular/router';
import CreateInvoiceComponent from '../features/create-invoice/create-invoice.component';
import SignupComponent from '../features/auth/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'create',
  },
  {
    component: CreateInvoiceComponent,
    path: 'create',
  },
  {
    component: SignupComponent,
    path: 'signup',
  },
];

export const appRoutingProviders: any[] = [
];

export default RouterModule.forRoot(routes);
