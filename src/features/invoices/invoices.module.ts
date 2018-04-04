import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import SharedModule from '../shared.module';
import InvoiceEditModule from './invoice-edit/invoice-edit.module';
import { PrintInvoiceModule } from './print-invoice/print-invoice.module';
import InvoicesRoutingModule from './invoices-routing.module';

import CreateInvoiceComponent from './create-invoice/create-invoice.component';
import InvoicesEditComponent from './invoices-edit/invoices-edit.component';
import InvoicesListComponent from './invoices-list/invoices-list.component';
import TaxesListComponent from './taxes-list/taxes-list.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    InvoiceEditModule,
    PrintInvoiceModule,
    InvoicesRoutingModule
  ],
  declarations: [
    CreateInvoiceComponent,
    InvoicesEditComponent,
    InvoicesListComponent,
    TaxesListComponent
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export default class InvoicesModule {}
