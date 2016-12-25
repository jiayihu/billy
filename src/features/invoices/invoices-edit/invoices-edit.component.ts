import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable }  from 'rxjs/Observable';
import { Subscription }  from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import StoreService, { IInvoice } from '../../../services/store.service';

@Component({
  selector: 'invoices-edit',
  template: `<h3>Invoice edit</h3>`,
})
export default class InvoicesEditComponent implements OnInit, OnDestroy {
  invoice: IInvoice;
  invoiceSub: Subscription;

  constructor(private storeService: StoreService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.invoiceSub = Observable.combineLatest(this.storeService.store$, this.route.params, (store, params) => {
      const invoiceId = params['invoiceId'];
      return store.invoices.find(invoice => invoice.id === invoiceId);
    })
    .do(invoice => console.log(invoice))
    .subscribe(invoice => this.invoice = invoice);
  }

  ngOnDestroy() {
    this.invoiceSub.unsubscribe();
  }
}
