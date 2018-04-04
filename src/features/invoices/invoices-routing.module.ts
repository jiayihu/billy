import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import AuthGuard from '@services/auth-guard.service';
import DeactivateGuard from '@services/deactivate-guard.service';
import CreateInvoiceComponent from './create-invoice/create-invoice.component';
import InvoicesListComponent from './invoices-list/invoices-list.component';
import InvoicesEditComponent from './invoices-edit/invoices-edit.component';
import { PrintInvoiceComponent } from './print-invoice/print-invoice.component';

export const invoicesRoutes: Route[] = [
  {
    path: 'create',
    canActivate: [AuthGuard],
    canDeactivate: [DeactivateGuard],
    component: CreateInvoiceComponent
  },
  {
    path: 'invoices',
    canActivate: [AuthGuard],
    component: InvoicesListComponent,
    pathMatch: 'full'
  },
  {
    path: 'invoices/:invoiceId/edit',
    canActivate: [AuthGuard],
    canDeactivate: [DeactivateGuard],
    component: InvoicesEditComponent
  },
  {
    path: 'invoices/:invoiceId/print',
    canActivate: [AuthGuard],
    component: PrintInvoiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(invoicesRoutes)],
  exports: [RouterModule]
})
export default class InvoicesRoutingModule {}
