import { IAction } from '../types/redux.types';
import { ICustomer } from '../models/customers.model';

export const customersActionTypes = {
  ADD_CUSTOMER: 'ADD_CUSTOMER',
  EDIT_CUSTOMER: 'EDIT_CUSTOMER',
  DELETE_CUSTOMER: 'DELETE_CUSTOMER',
};

export function addCustomer(customer: ICustomer): IAction {
  return {
    type: customersActionTypes.ADD_CUSTOMER,
    payload: { customer },
  };
}

export function editCustomer(customer: ICustomer): IAction {
  return {
    type: customersActionTypes.EDIT_CUSTOMER,
    payload: { customer },
  };
}

export function deleteCustomer(customerId: string): IAction {
  return {
    type: customersActionTypes.DELETE_CUSTOMER,
    payload: { customerId },
  };
}
