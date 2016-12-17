import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import uuid = require('uuid');
import set = require('lodash/fp/set');

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

// @TODO: Well, probably a class could fit better than an interface. But for now inheritance is not
// needed.
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

export interface IStore {
  user: IUser;
  customers: ICustomer[];
  invoices: IInvoice[];
  taxes: ITax[];
}

@Injectable()
export default class StoreService {
  private store: IStore;
  private storeSource = new BehaviorSubject<IStore>(this.store);

  store$ = this.storeSource.asObservable();

  constructor() {
    const defaultStore: IStore = {
      user: { name: '' },
      customers: [],
      invoices: [],
      taxes: [],
    };

    try {
      const persistedStore = JSON.parse(localStorage.getItem('billy-store'));
      this.store = Object.assign({}, defaultStore, persistedStore);
    } catch (exception) {
      console.error('Something went wrong with localStorage in StoreService: ', exception);
    }

    this.storeSource.next(this.store);
  }

  private persist(key: string, value: any): void {
    try {
      localStorage.setItem(`billy-${key}`, JSON.stringify(value));
    } catch (exception) {
      console.error('Could not save to localStorage. ', exception);
    }
  }

  private editStore(path: string, value: any) {
    this.store = set(path, value, this.store) as IStore;
    this.persist('store', this.store);
    this.storeSource.next(this.store);
  }

  generateId(entity: string): string {
    return `${entity.toUpperCase()}_${uuid.v4()}`;
  }

  editUser(value): void {
    const updatedUser = Object.assign({}, this.store.user, value);
    this.editStore('user', updatedUser);
  }

  addCustomer(customer: ICustomer): void {
    const customerId = this.generateId('CUSTOMER');
    const newCustomer = Object.assign({}, customer, { id: customerId });
    const newCustomers = this.store.customers.concat(newCustomer);

    this.editStore('customers', newCustomers);
  }

  deleteCustomer(customerId: string): void {
    const filteredCustomers = this.store.customers.filter(customer => customer.id !== customerId);
    this.editStore('customers', filteredCustomers);
  }

  editCustomer(newCustomer: ICustomer): void {
    const updatedCustomers = this.store.customers.map(customer => {
      if (customer.id !== newCustomer.id) return customer;

      return Object.assign({}, customer, newCustomer);
    });
    this.editStore('customers', updatedCustomers);
  }

  addTax(tax: ITax) {
    this.editStore('taxes', this.store.taxes.concat(tax));
  }

  editTax(updatedTax: ITax) {
    const updatedTaxes = this.store.taxes.map(tax => {
      if (tax.id === updatedTax.id) return updatedTax;
      return tax;
    });

    this.editStore('taxes', updatedTaxes);
  }

  deleteTax(taxId: string) {
    const filteredTaxes = this.store.taxes.filter(tax => tax.id !== taxId);
    this.editStore('taxes', filteredTaxes);
  }
}
