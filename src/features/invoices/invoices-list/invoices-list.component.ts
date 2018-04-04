import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
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
      useClass: TaxesLoggerService
    }
  ]
})
export default class InvoicesListComponent implements OnInit {
  invoices$: Observable<IInvoice[]>;
  taxes$: Observable<ITax[]>;

  constructor(
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

  handleInvoicePrint(invoiceId: string) {
    this.router.navigateByUrl(`/invoices/${invoiceId}/print`);
  }

  handleTaxEdit(updatedTax: ITax) {
    this.taxesModel.editTax(updatedTax);
  }

  handleTaxDelete(taxId: string) {
    this.taxesModel.deleteTax(taxId);
  }
}
