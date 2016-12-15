import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import CustomersModule from '../customers/customers.module';
import PipesModule from '../pipes/pipes.module';
import UIModule from '../ui/ui.module';

import CreateInvoiceComponent from './create-invoice.component';
import CustomerComponent from './customer/customer.component';
import UserBusinessComponent from './user-business/user-business.component';
import TasksComponent from './tasks/tasks.component';
import TaxesComponent from './taxes/taxes.component';

@NgModule({
  imports: [
    CommonModule,
    CustomersModule,
    UIModule,
    FormsModule,
    PipesModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CreateInvoiceComponent,
    CustomerComponent,
    UserBusinessComponent,
    TasksComponent,
    TaxesComponent,
   ],
  exports: [CreateInvoiceComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class CreateInvoiceModule {

}
