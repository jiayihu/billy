import { IAction } from '../types/redux.types';
import { IInvoice } from '../models/invoices.model';
import { actionTypes } from '../actions/invoices.actions';

export type IInvoicesState = Readonly<IInvoice[]>;

export default function invoicesReducer(state: IInvoicesState = [], action: IAction): IInvoicesState {
  switch (action.type) {
    case actionTypes.ADD_INVOICE_SUCCEEDED:
      return state.concat(action.payload.invoice);
    case actionTypes.EDIT_INVOICE:
      return state.map(invoice => {
        if (invoice.id === action.payload.invoice.id) return action.payload.invoice;

        return invoice;
      });
    case actionTypes.DELETE_INVOICE:
      return state.filter(invoice => invoice.id !== action.payload.invoiceId);
    default:
      return state;
  }
}
