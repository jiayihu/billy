import { ICustomer } from '../models/customers.model';
import { customersActions } from '../actions/';

export type ICustomersState = ICustomer[];

export default function customersReducer(
  state: ICustomersState = [],
  action: IAction
): ICustomersState {
  switch (action.type) {
    case customersActions.addCustomers.types.success:
      return action.payload.customers;
    case customersActions.addCustomer.types.success:
      return state.concat(action.payload.customer);
    case customersActions.editCustomer.types.success: {
      const newCustomer = action.payload.customer;
      return state.map(customer => {
        if (customer.id === newCustomer.id) return { ...customer, ...newCustomer };

        return customer;
      });
    }
    case customersActions.deleteCustomer.types.success:
      return state.filter(customer => customer.id !== action.payload.customerId);
    default:
      return state;
  }
}
