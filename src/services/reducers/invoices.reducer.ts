import { Action } from '../types/redux.types';
import { IInvoice } from '../models/invoices.model';
import { invoicesActionTypes } from '../actions/invoices.actions';

export type IInvoicesState = Readonly<IInvoice[]>;

export default function invoicesReducer(state: IInvoicesState = [], action: Action): IInvoicesState {
  switch (action.type) {
    case invoicesActionTypes.ADD_INVOICE:
      return state.concat(action.payload.invoice);
    case invoicesActionTypes.EDIT_INVOICE:
      return state.map(invoice => {
        if (invoice.id === action.payload.invoice.id) return action.payload.invoice;

        return invoice;
      });
    case invoicesActionTypes.DELETE_INVOICE:
      return state.filter(invoice => invoice.id !== action.payload.invoiceId);
    default:
      return state;
  }
}
