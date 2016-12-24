import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import DirectivesModule from '../directives/directives.module';
import PipesModule from '../pipes/pipes.module';
import UIModule from '../ui/ui.module';

import CustomerEditComponent from './customer-edit/customer-edit.component';
import CustomersListComponent from './customers-list/customers-list.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DirectivesModule,
    PipesModule,
    UIModule,
  ],
  declarations: [CustomerEditComponent, CustomersListComponent],
  exports: [CustomerEditComponent, CustomersListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class CustomersModule {}
