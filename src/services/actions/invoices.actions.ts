import { IAction } from '../types/redux.types';
import { IInvoice } from '../models/invoices.model';

export const invoicesActionTypes = {
  ADD_INVOICE: 'ADD_INVOICE',
  EDIT_INVOICE: 'EDIT_INVOICE',
  DELETE_INVOICE: 'DELETE_INVOICE',
};

export function addInvoice(invoice: IInvoice): IAction {
  return {
    type: invoicesActionTypes.ADD_INVOICE,
    payload: { invoice },
  };
}

export function editInvoice(invoice: IInvoice): IAction {
  return {
    type: invoicesActionTypes.EDIT_INVOICE,
    payload: { invoice },
  };
}

export function deleteInvoice(invoiceId: string): IAction {
  return {
    type: invoicesActionTypes.DELETE_INVOICE,
    payload: { invoiceId },
  };
}
