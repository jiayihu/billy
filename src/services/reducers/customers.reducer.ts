import { Action } from '../types/redux.types';
import { ICustomer } from '../model.service';
import { customersActionTypes } from '../actions/customers.actions';

export type ICustomersState = ICustomer[];

export default function customersReducer(state: ICustomersState = [], action: Action): ICustomersState {
  switch (action.type) {
    case customersActionTypes.ADD_CUSTOMER:
      return state.concat(action.payload.customer);
    case customersActionTypes.EDIT_CUSTOMER: {
      const newCustomer = action.payload.customer;
      return state.map(customer => {
        if (customer.id === newCustomer.id) return { ...customer, ...newCustomer };

        return customer;
      });
    }
    case customersActionTypes.DELETE_CUSTOMER:
      return state.filter(customer => customer.id !== action.payload.customerId);
    default:
      return state;
  }
}
