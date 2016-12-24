import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import PipesModule from '../pipes/pipes.module';
import UIModule from '../ui/ui.module';
import InvoicesRoutingModule from './invoices-routing.module';

import InvoiceEditComponent from './invoice-edit/invoice-edit.component';
import InvoicesComponent from './invoices.component';
import TaxesListComponent from './taxes-list/taxes-list.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, PipesModule, UIModule, InvoicesRoutingModule],
  declarations: [InvoiceEditComponent, InvoicesComponent, TaxesListComponent],
  exports: [InvoicesComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class InvoicesModule {}
