import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import ModelService, { IInvoice, ITax } from '@services/model.service';
import LoggerService from '@services/logger.service';
import TaxesLoggerService from '../services/taxes-logger.service';

@Component({
  selector: 'invoices',
  templateUrl: './invoices-list.component.html',
  styleUrls: ['./invoices-list.component.css'],
  providers: [
    {
      provide: LoggerService,
      useClass: TaxesLoggerService,
    },
  ],
})
export default class InvoicesListComponent {
  invoices$: Observable< IInvoice[]>;
  taxes$: Observable<ITax[]>;

  constructor(private modelService: ModelService, private router: Router) {}

  ngOnInit() {
    this.invoices$ = this.modelService.invoices$;
    this.taxes$ = this.modelService.taxes$;
  }

  handleInvoiceEdit(invoiceId: string) {
    this.router.navigateByUrl(`/invoices/${invoiceId}/edit`);
  }

  handleInvoiceDelete(invoiceId: string) {
    this.modelService.deleteInvoice(invoiceId);
  }

  handleTaxEdit(updatedTax: ITax) {
    this.modelService.editTax(updatedTax);
  }

  handleTaxDelete(taxId: string) {
    this.modelService.deleteTax(taxId);
  }
}
