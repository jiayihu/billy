import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import StoreService, { IInvoice, ITax } from '../../services/store.service';
import LoggerService from '../../services/logger.service';
import TaxesLoggerService from './services/taxes-logger.service';

@Component({
  selector: 'invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css'],
  providers: [
    {
      provide: LoggerService,
      useClass: TaxesLoggerService,
    },
  ],
})
export default class InvoicesComponent implements OnDestroy {
  invoices: IInvoice[] = [];
  taxes: ITax[] = [];
  private storeSub: Subscription;

  constructor(private storeService: StoreService) {}

  ngOnInit() {
    this.storeSub = this.storeService.store$.subscribe(store => {
      this.taxes = store.taxes;
      this.invoices = store.invoices;
    });
  }

  ngOnDestroy() {
    this.storeSub.unsubscribe();
  }

  handleTaxEdit(updatedTax: ITax) {
    this.storeService.editTax(updatedTax);
  }

  handleTaxDelete(taxId: string) {
    this.storeService.deleteTax(taxId);
  }
}
