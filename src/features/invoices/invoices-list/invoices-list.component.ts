import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import StoreService, { IInvoice, ITax } from '@services/store.service';
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
export default class InvoicesListComponent implements OnDestroy {
  invoices: IInvoice[] = [];
  taxes: ITax[] = [];
  private storeSub: Subscription;

  constructor(private storeService: StoreService, private router: Router) {}

  ngOnInit() {
    this.storeSub = this.storeService.store$.subscribe(store => {
      this.taxes = store.taxes;
      this.invoices = store.invoices;
    });
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }

  handleInvoiceEdit(invoiceId: string) {
    this.router.navigateByUrl(`/invoices/${invoiceId}/edit`);
  }

  handleInvoiceDelete(invoiceId: string) {
    this.storeService.deleteInvoice(invoiceId);
  }

  handleTaxEdit(updatedTax: ITax) {
    this.storeService.editTax(updatedTax);
  }

  handleTaxDelete(taxId: string) {
    this.storeService.deleteTax(taxId);
  }
}
