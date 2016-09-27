import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import UIModule from '../ui/ui.module';

import CreateInvoiceComponent from './create-invoice.component';
import UserBusinessComponent from './user-business/user-business.component';
import CustomerComponent from './customer/customer.component';

@NgModule({
  imports: [CommonModule, FormsModule, UIModule],
  declarations: [
    CreateInvoiceComponent,
    UserBusinessComponent,
    CustomerComponent,
   ],
  exports: [CreateInvoiceComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class CreateInvoiceModule {

}
