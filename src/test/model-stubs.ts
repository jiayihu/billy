/* tslint:disable max-classes-per-file */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ICustomer } from '@services/models/customers.model';
import { IInvoice, ITask } from '@services/models/invoices.model';
import { ITax } from '@services/models/taxes.model';

@Injectable()
export class CustomersModelStub {
  static customer: ICustomer = { id: 'CUSTOMER_0', name: 'Mario' };
  private customers: ICustomer[] = [CustomersModelStub.customer];
  private customersSource = new BehaviorSubject(this.customers);

  customers$ = this.customersSource.asObservable();
}

@Injectable()
export class TaxesModelStub {
  static tax: ITax = { id: 'TAX_0', name: 'Tax name 0', rate: 1 };
  private taxes: ITax[] = [TaxesModelStub.tax];
  private taxesSource = new BehaviorSubject(this.taxes);

  taxes$ = this.taxesSource.asObservable();
}

@Injectable()
export class InvoicesModelStub {
  static invoice: IInvoice = {
    id: 'INVOICE_0',
    customer: CustomersModelStub.customer,
    date: '',
    location: '',
    notes: '',
    number: 0,
    tasks: [],
    taxes: [],
    total: 0,
    user: { name: 'Luigi' }
  };

  private invoices: IInvoice[] = [InvoicesModelStub.invoice];
  private invoicesSource = new BehaviorSubject(this.invoices);

  invoices$ = this.invoicesSource.asObservable();
}
