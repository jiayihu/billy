import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface IUser {
  name: string;
  vat?: string;
  address?: string;
  city?: string;
  zip?: string;
  country?: string;
  province?: string;
}

export interface ICustomer {
  name: string;
  vat?: string;
  address?: string;
  city?: string;
  zip?: string;
  country?: string;
  province?: string;
}

@Injectable()
export default class StoreService {
  private user: IUser = { name: 'Giovanni Jiayi Hu' };
  private customers: ICustomer[] = [{ name: 'ACME s.r.l.' }];
  private userSource = new BehaviorSubject<IUser>(this.user);
  private customersSource = new BehaviorSubject<ICustomer[]>(this.customers);

  user$ = this.userSource.asObservable();
  customers$ = this.customersSource.asObservable();

  constructor() {
    try {
      const storedUser = JSON.parse(localStorage.getItem('billy-user'));
      const storedCustomers = JSON.parse(localStorage.getItem('billy-customers'));
      this.user = storedUser || this.user;
      this.customers = storedCustomers || this.customers;
    } catch (exception) {
      console.error('Something went wrong with localStorage in StoreService: ', exception);
    }

    this.userSource.next(this.user);
    this.customersSource.next(this.customers);
  }

  private persist(property: string): void {
    try {
      localStorage.setItem(`billy-${property}`, JSON.stringify(this[property]));
    } catch (exception) {
      console.error('Could not save to localStorage. ', exception);
    }
  }

  setUser(updatedUser): void {
    this.user = Object.assign({}, this.user, updatedUser);
    this.persist('user');
    this.userSource.next(this.user);
  }

  addCustomer(customer: ICustomer): void {
    this.customers = this.customers.concat(customer);
    this.persist('customers');
    this.customersSource.next(this.customers);
  }
}
