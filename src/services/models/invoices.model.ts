import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgRedux as Store } from '@angular-redux/store';
import * as selectors from '@services/reducers/';
import { invoicesActions } from '@services/actions/';
import BaseModel from './base.model';
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
export default class InvoicesModel extends BaseModel {
  invoices$: Observable<IInvoice[]>;

  constructor(
    private store: Store<selectors.IState>,
    private notificationsService: NotificationsService,
  ) {
    super();
    this.invoices$ = this.store.select(selectors.getInvoices);
  }

  addInvoice(invoice: IInvoice) {
    this.store.dispatch(invoicesActions.addInvoice.request(invoice));
    this.notificationsService.success('Invoice', 'Invoice saved successfully.');
  }

  deleteInvoice(invoiceId: string) {
    this.store.dispatch(invoicesActions.deleteInvoice(invoiceId));
  }

  editInvoice(updatedInvoice: IInvoice) {
    this.store.dispatch(invoicesActions.editInvoice(updatedInvoice));
    this.notificationsService.success('Invoice', 'Invoice edited successfully.');
  }
}
