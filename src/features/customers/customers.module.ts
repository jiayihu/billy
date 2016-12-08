import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import UIModule from '../ui/ui.module';

import CustomerEditComponent from './customer-edit/customer-edit.component';
import CustomersListComponent from './customers-list/customers-list.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, UIModule],
  declarations: [CustomerEditComponent, CustomersListComponent],
  exports: [CustomerEditComponent, CustomersListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class CustomersModule {}
