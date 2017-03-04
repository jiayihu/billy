import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgRedux as Store } from '@angular-redux/store';
import * as selectors from '@services/reducers/';
import { invoicesActions } from '@services/actions/';
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
  user: IUser;
}

@Injectable()
export default class InvoicesModel {
  invoices$: Observable<IInvoice[]>;

  constructor(
    private store: Store<selectors.IState>,
    private notificationsService: NotificationsService,
  ) {
    this.invoices$ = this.store.select(selectors.getInvoices);
  }

  generateId(entity: string): string {
    return uniqueId(`${entity}_`);
  }

  addInvoice(invoice: IInvoice) {
    this.store.dispatch(invoicesActions.addInvoice.request(invoice));
    this.notificationsService.success('Invoice', 'Invoice saved successfully.');
  }

  deleteInvoice(invoiceId: string) {
    this.store.dispatch(invoicesActions.deleteInvoice.request(invoiceId));
  }

  editInvoice(updatedInvoice: IInvoice) {
    this.store.dispatch(invoicesActions.editInvoice.request(updatedInvoice));
    this.notificationsService.success('Invoice', 'Invoice edited successfully.');
  }
}
