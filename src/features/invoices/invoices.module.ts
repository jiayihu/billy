import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import UIModule from '../ui/ui.module';

import InvoicesComponent from './invoices.component';
import TaxesListComponent from './taxes-list/taxes-list.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, UIModule],
  declarations: [InvoicesComponent, TaxesListComponent],
  exports: [InvoicesComponent],
})
export default class InvoicesModule {}
