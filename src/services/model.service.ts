import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgRedux as Store } from 'ng2-redux';
import * as selectors from '@services/reducers/';
import { authActions, customersActions, invoicesActions, taxesActions, userActions } from '@services/actions/';
import ConfigService from '@services/config.service';
import storage from '../utils/storage';
import uuid = require('uuid');
import { NotificationsService } from 'angular2-notifications';
import { AngularFire } from 'angularfire2';

export interface IUser {
  name: string;
  vat?: string;
  address?: string;
  city?: string;
  zip?: string;
  country?: string;
  province?: string;
}

// The Customer Interface is equal to User for now, but in the future will have differences
export interface ICustomer {
  id: string;
  name: string;
  vat?: string;
  address?: string;
  city?: string;
  zip?: string;
  country?: string;
  province?: string;
}

export interface ITask {
  id: string;
  amount: number;
  description: string;
  quantity: number;
  price: number;
}

export interface ITax {
  id: string;
  name: string;
  rate: number;
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

export interface ISettings {
  currency: string;
  taxes: ITax[];
}

@Injectable()
export default class ModelService {
  user$: Observable<IUser>;
  customers$: Observable<ICustomer[]>;
  invoices$: Observable<IInvoice[]>;
  taxes$: Observable<ITax[]>;

  constructor(
    private notificationsService: NotificationsService,
    private store: Store<selectors.IState>,
    private firebase: AngularFire,
    private config: ConfigService
  ) {
    this.user$ = this.store.select(selectors.getUser);
    this.customers$ = this.store.select(selectors.getCustomers);
    this.invoices$ = this.store.select(selectors.getInvoices);
    this.taxes$ = this.store.select(selectors.getTaxes);

    const store$ = this.store.select(s => s);

    store$
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(appState => {
        storage.setItem(this.config.get('LOCALSTORAGE'), appState);
      });

    // Wait for Store to be available, then subscribe for auth changes. Otherwise
    // Firebase could emit an auth object from localStorage before the Store is
    // created.
    store$
      .take(1)
      .concat(firebase.auth)
      .skip(1)
      .subscribe(auth => {
        if (auth && auth.auth) this.authenticate(auth.auth);
      });
  }

  generateId(entity: string): string {
    return `${entity.toUpperCase()}_${uuid.v4()}`;
  }

  authenticate(auth) {
    this.store.dispatch(authActions.authenticate(auth));
  }

  logout() {
    this.store.dispatch(authActions.logoutUser());
  }

  editUser(value): void {
    this.store.dispatch(userActions.editUser(value));
  }

  addCustomer(customer: ICustomer): void {
    const customerId = this.generateId('CUSTOMER');
    const newCustomer = Object.assign({}, customer, { id: customerId });
    this.store.dispatch(customersActions.addCustomer(newCustomer));
  }

  deleteCustomer(customerId: string): void {
    this.store.dispatch(customersActions.deleteCustomer(customerId));
  }

  editCustomer(newCustomer: ICustomer): void {
    this.store.dispatch(customersActions.editCustomer(newCustomer));
  }

  addTax(): ITax {
    let storedtaxes: ITax[];
    this.taxes$.first().subscribe(taxes => storedtaxes = taxes);
    console.log('storedTaxes: ', storedtaxes);
    const newTax: ITax = {
      id: this.generateId('TAX'),
      name: `Tax #${storedtaxes.length + 1}`,
      rate: 0,
    };
    this.store.dispatch(taxesActions.addTax(newTax));

    return newTax;
  }

  editTax(updatedTax: ITax) {
    this.store.dispatch(taxesActions.editTax(updatedTax));
  }

  deleteTax(taxId: string) {
    this.store.dispatch(taxesActions.deleteTax(taxId));
  }

  addInvoice(invoice: IInvoice) {
    const newInvoice = { ...invoice, id: this.generateId('INVOICE') };
    this.store.dispatch(invoicesActions.addInvoice(newInvoice));
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
