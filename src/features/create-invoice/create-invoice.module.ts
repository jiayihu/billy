import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import UIModule from '../ui/ui.module';

import CreateInvoiceComponent from './create-invoice.component';

@NgModule({
  imports: [CommonModule, UIModule],
  declarations: [CreateInvoiceComponent],
  exports: [CreateInvoiceComponent],
})
export default class CreateInvoiceModule {

}
