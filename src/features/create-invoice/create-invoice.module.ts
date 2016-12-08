import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import CustomersModule from '../customers/customers.module';
import UIModule from '../ui/ui.module';

import CreateInvoiceComponent from './create-invoice.component';
import UserBusinessComponent from './user-business/user-business.component';
import CustomerComponent from './customer/customer.component';

@NgModule({
  imports: [CommonModule, CustomersModule, UIModule, FormsModule, ReactiveFormsModule],
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
