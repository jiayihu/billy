import { ICustomer } from '../models/customers.model';
import createAction from './createAction';

export const addCustomers = createAction('ADD_CUSTOMERS', {
  success: customers => ({ customers })
});

export const addCustomer = createAction('ADD_CUSTOMER', {
  request: customer => ({ customer }),
  success: customer => ({ customer })
});

export const editCustomer = createAction('EDIT_CUSTOMER', {
  request: customer => ({ customer }),
  success: customer => ({ customer })
});

export const deleteCustomer = createAction('DELETE_CUSTOMER', {
  request: customerId => ({ customerId }),
  success: customerId => ({ customerId })
});
