import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import uuid = require('uuid');
import set = require('lodash/set');

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
  amount: string;
  description: string;
  quantity: number;
  price: number;
}

export interface ITax {
  name: string;
  rate: number;
}

// @TODO: Well, probably a class could fit better than an interface. But for now inheritance is not
// needed.
export interface IInvoice {
  id: string;
  currency?: string;
  customer?: ICustomer;
  date: string;
  location?: string;
  number: number;
  tasks?: ITask[];
  taxes?: ITax[];
  user: IUser;
}

export interface ISettings {
  currency: string;
  taxes: ITax[];
}

export interface IStore {
  user?: IUser;
  customers?: ICustomer[];
  invoices?: IInvoice[];
}

@Injectable()
export default class StoreService {
  private store: IStore = {};
  private storeSource = new BehaviorSubject<IStore>(this.store);

  store$ = this.storeSource.asObservable();

  constructor() {
    const defaultStore: IStore = {
      user: { name: '' },
      customers: [],
    };

    try {
      const persistedStore = JSON.parse(localStorage.getItem('billy-store'));
      this.store = persistedStore || defaultStore;
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
    this.store = set(this.store, path, value);
    this.persist('store', this.store);
    this.storeSource.next(this.store);
  }

  editUser(value): void {
    const updatedUser = Object.assign({}, this.store.user, value);
    this.editStore('user', updatedUser);
  }

  addCustomer(customer: ICustomer): void {
    const customerId = `CUSTOMER_${uuid.v4()}`;
    const newCustomer = Object.assign({}, customer, { id: customerId });
    const newCustomers = this.store.customers.concat(newCustomer);

    this.editStore('customers', newCustomers);
  }

  deleteCustomer(customerId: string): void {
    const filteredCustomers = this.store.customers.filter(customer => customer.id !== customerId);
    this.editStore('customers', filteredCustomers);
  }

  editCustomer(customerId: string, newCustomer: ICustomer): void {
    const updatedCustomers = this.store.customers.map(customer => {
      if (customer.id !== customerId) return customer;

      return Object.assign({}, customer, newCustomer);
    });
    this.editStore('customers', updatedCustomers);
  }
}
