import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import SharedModule from '../shared.module';
import InvoicesRoutingModule from './invoices-routing.module';

import InvoiceEditComponent from './invoice-edit/invoice-edit.component';
import InvoicesComponent from './invoices.component';
import TaxesListComponent from './taxes-list/taxes-list.component';

@NgModule({
  imports: [SharedModule, ReactiveFormsModule, InvoicesRoutingModule],
  declarations: [InvoiceEditComponent, InvoicesComponent, TaxesListComponent],
  exports: [InvoicesComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class InvoicesModule {}
