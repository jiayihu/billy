import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import AuthGuard from '@services/auth-guard.service';
import CreateInvoiceComponent from './create-invoice/create-invoice.component';
import InvoicesListComponent from './invoices-list/invoices-list.component';
import InvoicesEditComponent from './invoices-edit/invoices-edit.component';

export const invoicesRoutes: Route[] = [
  {
    path: 'create',
    canActivate: [AuthGuard],
    component: CreateInvoiceComponent,
  },
  {
    path: 'invoices',
    canActivate: [AuthGuard],
    component: InvoicesListComponent,
    pathMatch: 'full',
  },
  {
    path: 'invoices/:invoiceId/edit',
    canActivate: [AuthGuard],
    component: InvoicesEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(invoicesRoutes)],
  exports: [RouterModule],
})
export default class InvoicesRoutingModule {}
