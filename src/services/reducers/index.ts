import { combineReducers, Reducer } from 'redux';
import customersReducer, { ICustomersState } from './customers.reducer';
import invoicesReducer, { IInvoicesState } from './invoices.reducer';
import taxesReducer, { ITaxesState } from './taxes.reducer';
import userReducer, { IUserState } from './user.reducer';

export interface IState {
  user: IUserState;
  customers: ICustomersState;
  invoices: IInvoicesState;
  taxes: ITaxesState;
};

export default combineReducers({
  user: userReducer,
  customers: customersReducer,
  invoices: invoicesReducer,
  taxes: taxesReducer,
}) as Reducer<IState>;

/**
 * Selectors
 */

export function getUser(state: IState): IUserState {
  return state.user;
}

export function getCustomers(state: IState): ICustomersState {
  return state.customers;
}

export function getInvoices(state: IState): IInvoicesState {
 return state.invoices;
}

export function getTaxes(state: IState): ITaxesState {
 return state.taxes;
}
