import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import SharedModule from '../shared.module';

import CustomerEditComponent from './customer-edit/customer-edit.component';
import CustomersListComponent from './customers-list/customers-list.component';

@NgModule({
  imports: [SharedModule, ReactiveFormsModule],
  declarations: [CustomerEditComponent, CustomersListComponent],
  exports: [CustomerEditComponent, CustomersListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export default class CustomersModule {}
