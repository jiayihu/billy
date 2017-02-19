import { IAction } from '../types/redux.types';
import { IInvoice } from '../models/invoices.model';
import createAction from './createAction';

export const actionTypes = {
  EDIT_INVOICE: 'EDIT_INVOICE',
  DELETE_INVOICE: 'DELETE_INVOICE',
};

export const addInvoice = createAction('ADD_INVOICE', {
  request: (invoice) => ({ invoice }),
  success: (invoice) => ({ invoice }),
});

export function editInvoice(invoice: IInvoice): IAction {
  return {
    type: actionTypes.EDIT_INVOICE,
    payload: { invoice },
  };
}

export function deleteInvoice(invoiceId: string): IAction {
  return {
    type: actionTypes.DELETE_INVOICE,
    payload: { invoiceId },
  };
}
