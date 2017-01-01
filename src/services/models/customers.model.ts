import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgRedux as Store } from 'ng2-redux';
import * as selectors from '@services/reducers/';
import { customersActions } from '@services/actions/';
import BaseModel from './base.model';

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

@Injectable()
export default class AuthModel extends BaseModel {
  customers$: Observable<ICustomer[]>;

  constructor(private store: Store<selectors.IState>) {
    super();
    this.customers$ = this.store.select(selectors.getCustomers);
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
}
