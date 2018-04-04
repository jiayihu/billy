import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgRedux as Store } from '@angular-redux/store';
import * as selectors from '@services/reducers/';
import { invoicesActions } from '@services/actions/';
import isEmpty = require('lodash/isEmpty');
import uniqueId = require('lodash/uniqueId');
import { NotificationsService } from 'angular2-notifications';
import { ICustomer } from './customers.model';
import { IUser } from './user.model';
import { ITax } from './taxes.model';

export interface ITask {
  id: string;
  amount: number;
  description: string;
  quantity: number;
  price: number;
}

export interface IInvoice {
  id: string;
  currency?: string;
  customer: ICustomer;
  date: string;
  location: string;
  notes: string;
  number: number;
  tasks: ITask[];
  taxes: ITax[];
  total: number;
  user: IUser;
}

@Injectable()
export default class InvoicesModel {
  invoices$: Observable<IInvoice[]>;

  constructor(
    private store: Store<selectors.IState>,
    private notificationsService: NotificationsService
  ) {
    this.invoices$ = this.store.select(selectors.getInvoices);
  }

  generateId(entity: string): string {
    return uniqueId(`${entity}_`);
  }

  addInvoice(invoice: IInvoice): Promise<IInvoice> {
    if (!this.checkValidity(invoice)) return;

    return (this.store as any)
      .dispatch(invoicesActions.addInvoice.request(invoice))
      .then(response => {
        this.notificationsService.success('Invoice', 'Invoice saved successfully.');
        return response.payload.invoice;
      });
  }

  deleteInvoice(invoiceId: string) {
    this.store.dispatch(invoicesActions.deleteInvoice.request(invoiceId));
  }

  editInvoice(updatedInvoice: IInvoice) {
    if (!this.checkValidity(updatedInvoice)) return;

    this.store.dispatch(invoicesActions.editInvoice.request(updatedInvoice));
    this.notificationsService.success('Invoice', 'Invoice edited successfully.');
  }

  private checkValidity(invoice: IInvoice): boolean {
    const requiredFields = ['customer', 'date', 'location', 'number', 'tasks', 'user'];
    for (const field of requiredFields) {
      const value = invoice[field];
      if (!value || (typeof value !== 'number' && isEmpty(value))) {
        this.notificationsService.error('Invoice', `Cannot save, '${field}' is required.`);
        return false;
      }
    }

    return true;
  }
}
