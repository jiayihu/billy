import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import CreateInvoiceComponent from '../features/create-invoice/create-invoice.component';
import CustomersComponent from '../features/customers/customers-list/customers-list.component';
import { invoicesRoutes } from '../features/invoices/invoices-routing.module';
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
  ...invoicesRoutes,
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export default class AppRoutingModule {}
