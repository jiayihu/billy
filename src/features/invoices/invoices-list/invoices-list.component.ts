import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import ModelService from '@services/model.service';
import InvoicesModel, { IInvoice } from '@services/models/invoices.model';
import TaxesModel, { ITax } from '@services/models/taxes.model';
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

  constructor(
    private modelService: ModelService,
    private invoicesModel: InvoicesModel,
    private taxesModel: TaxesModel,
    private router: Router
  ) {}

  ngOnInit() {
    this.invoices$ = this.invoicesModel.invoices$;
    this.taxes$ = this.taxesModel.taxes$;
  }

  handleInvoiceEdit(invoiceId: string) {
    this.router.navigateByUrl(`/invoices/${invoiceId}/edit`);
  }

  handleInvoiceDelete(invoiceId: string) {
    this.invoicesModel.deleteInvoice(invoiceId);
  }

  handleTaxEdit(updatedTax: ITax) {
    this.taxesModel.editTax(updatedTax);
  }

  handleTaxDelete(taxId: string) {
    this.taxesModel.deleteTax(taxId);
  }
}
