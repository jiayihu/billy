import { NgModule } from '@angular/core';
import SharedModule from '../../shared.module';

import { DefaultTemplateComponent } from './default-template/default-template.component';
import { PrintInvoiceComponent } from './print-invoice.component';

@NgModule({
  imports: [SharedModule],
  declarations: [DefaultTemplateComponent, PrintInvoiceComponent],
  exports: [PrintInvoiceComponent]
})
export class PrintInvoiceModule {}
