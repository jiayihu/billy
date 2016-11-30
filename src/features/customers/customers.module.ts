import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import CustomerComponent from './customers.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CustomerComponent],
  exports: [CustomerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export default class CustomersModule {}
