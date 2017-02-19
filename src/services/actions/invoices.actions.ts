import { IAction } from '../types/redux.types';
import { IInvoice } from '../models/invoices.model';

export const actionTypes = {
  ADD_INVOICE_REQUESTED: 'ADD_INVOICE_REQUESTED',
  ADD_INVOICE_SUCCEEDED: 'ADD_INVOICE_SUCCEEDED',
  EDIT_INVOICE: 'EDIT_INVOICE',
  DELETE_INVOICE: 'DELETE_INVOICE',
};

export function addInvoice(invoice: IInvoice): IAction {
  return {
    type: actionTypes.ADD_INVOICE_REQUESTED,
    payload: { invoice },
  };
}

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
