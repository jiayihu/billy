import { Routes, RouterModule } from '@angular/router';
import CreateInvoiceComponent from '../features/create-invoice/create-invoice.component';
import CustomersComponent from '../features/customers/customers.component';
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
    component: CustomersComponent,
    path: 'customers',
  },
  {
    component: SignupComponent,
    path: 'signup',
  },
];

export default RouterModule.forRoot(routes);
