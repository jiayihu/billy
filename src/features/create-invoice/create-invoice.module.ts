import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import SharedModule from '../shared.module';
import CustomersModule from '../customers/customers.module';

import CreateInvoiceComponent from './create-invoice.component';
import CustomerComponent from './customer/customer.component';
import NotesComponent from './notes/notes.component';
import UserBusinessComponent from './user-business/user-business.component';
import TasksComponent from './tasks/tasks.component';
import TaxesComponent from './taxes/taxes.component';

@NgModule({
  imports: [
    SharedModule,
    CustomersModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CreateInvoiceComponent,
    CustomerComponent,
    NotesComponent,
    UserBusinessComponent,
    TasksComponent,
    TaxesComponent,
   ],
  exports: [CreateInvoiceComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class CreateInvoiceModule {

}
