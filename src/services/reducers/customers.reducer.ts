import { IAction } from '../types/redux.types';
import { ICustomer } from '../models/customers.model';
import { actionTypes } from '../actions/customers.actions';

export type ICustomersState = Readonly<ICustomer[]>;

export default function customersReducer(state: ICustomersState = [], action: IAction): ICustomersState {
  switch (action.type) {
    case actionTypes.ADD_CUSTOMER:
      return state.concat(action.payload.customer);
    case actionTypes.EDIT_CUSTOMER: {
      const newCustomer = action.payload.customer;
      return state.map(customer => {
        if (customer.id === newCustomer.id) return { ...customer, ...newCustomer };

        return customer;
      });
    }
    case actionTypes.DELETE_CUSTOMER:
      return state.filter(customer => customer.id !== action.payload.customerId);
    default:
      return state;
  }
}
