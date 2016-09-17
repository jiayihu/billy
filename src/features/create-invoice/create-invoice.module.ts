import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import UIModule from '../ui/ui.module';

import CreateInvoiceComponent from './create-invoice.component';
import UserBusinessComponent from './user-business/user-business.component';

@NgModule({
  imports: [CommonModule, FormsModule, UIModule],
  declarations: [
    CreateInvoiceComponent,
    UserBusinessComponent,
   ],
  exports: [CreateInvoiceComponent],
})
export default class CreateInvoiceModule {

}
