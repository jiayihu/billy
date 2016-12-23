import { Routes, RouterModule } from '@angular/router';
import CreateInvoiceComponent from '../features/create-invoice/create-invoice.component';
import CustomersComponent from '../features/customers/customers-list/customers-list.component';
import InvoicesComponent from '../features/invoices/invoices.component';
import SignupComponent from '../features/auth/signup/signup.component';

import NotFoundComponent from '../features/static/not-found/not-found.component';

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
    component: InvoicesComponent,
    path: 'invoices',
  },
  {
    component: CustomersComponent,
    path: 'customers',
  },
  {
    component: SignupComponent,
    path: 'signup',
  },
  {
    component: NotFoundComponent,
    path: '**',
  },
];

export default RouterModule.forRoot(routes);
