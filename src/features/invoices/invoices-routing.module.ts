import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import InvoicesComponent from './invoices.component';
import InvoiceEditComponent from './invoice-edit/invoice-edit.component';

export const invoicesRoutes: Route[] = [
  {
    path: 'invoices',
    component: InvoicesComponent,
    pathMatch: 'full',
  },
  {
    path: 'invoices/:invoiceId',
    component: InvoiceEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(invoicesRoutes)],
  exports: [RouterModule],
})
export default class InvoicesRoutingModule {}
