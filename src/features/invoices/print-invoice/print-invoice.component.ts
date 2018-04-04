import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import InvoicesModel, { IInvoice } from '@services/models/invoices.model';

@Component({
  selector: 'print-invoice',
  template: `
    <spinner *ngIf="!invoice"></spinner>
    <default-template *ngIf="invoice" [invoice]="invoice" ></default-template>
  `,
  styles: [
    `
    :host {
      font-family: 'Alegreya', serif;
      padding-top: 2rem;
    }
  `
  ]
})
export class PrintInvoiceComponent {
  invoice: IInvoice;

  private invoiceSub: Subscription;

  constructor(private invoicesModel: InvoicesModel, private route: ActivatedRoute) {
    this.invoiceSub = Observable.combineLatest(
      this.invoicesModel.invoices$,
      this.route.params,
      (invoices, params) => {
        const invoiceId = params['invoiceId'];
        return invoices.find(invoice => invoice.id === invoiceId);
      }
    ).subscribe(invoice => (this.invoice = invoice));
  }
}
