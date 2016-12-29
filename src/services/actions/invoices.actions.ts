import { Action } from '../types/redux.types';
import { IInvoice } from '../model.service';

export const invoicesActionTypes = {
  ADD_INVOICE: 'ADD_INVOICE',
  EDIT_INVOICE: 'EDIT_INVOICE',
  DELETE_INVOICE: 'DELETE_INVOICE',
};

export function addInvoice(invoice: IInvoice): Action {
  return {
    type: invoicesActionTypes.ADD_INVOICE,
    payload: { invoice },
  };
}

export function editInvoice(invoice: IInvoice): Action {
  return {
    type: invoicesActionTypes.EDIT_INVOICE,
    payload: { invoice },
  };
}

export function deleteInvoice(invoiceId: string): Action {
  return {
    type: invoicesActionTypes.DELETE_INVOICE,
    payload: { invoiceId },
  };
}
