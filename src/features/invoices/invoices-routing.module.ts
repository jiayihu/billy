import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import CreateInvoiceComponent from './create-invoice/create-invoice.component';
import InvoicesListComponent from './invoices-list/invoices-list.component';
import InvoicesEditComponent from './invoices-edit/invoices-edit.component';

export const invoicesRoutes: Route[] = [
  {
    component: CreateInvoiceComponent,
    path: 'create',
  },
  {
    path: 'invoices',
    component: InvoicesListComponent,
    pathMatch: 'full',
  },
  {
    path: 'invoices/:invoiceId/edit',
    component: InvoicesEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(invoicesRoutes)],
  exports: [RouterModule],
})
export default class InvoicesRoutingModule {}
