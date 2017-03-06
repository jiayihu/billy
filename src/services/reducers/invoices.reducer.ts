import { combineReducers, Reducer } from 'redux';
import { IInvoice } from '../models/invoices.model';
import { invoicesActions } from '../actions/';

export interface IInvoicesState {
  readonly newId: string;
  readonly list: IInvoice[];
};

function newIdReducer(state: string = '', action: IAction): string {
  switch (action.type) {
    case invoicesActions.addInvoice.types.success:
      return action.payload.invoice.id;
    default:
      return state;
  }
}

function listReducer(state: IInvoice[] = [], action: IAction): IInvoice[] {
  switch (action.type) {
    case invoicesActions.addInvoices.types.success:
      return action.payload.invoices;
    case invoicesActions.addInvoice.types.success:
      return state.concat(action.payload.invoice);
    case invoicesActions.editInvoice.types.success:
      return state.map(invoice => {
        if (invoice.id === action.payload.invoice.id) return action.payload.invoice;

        return invoice;
      });
    case invoicesActions.deleteInvoice.types.success:
      return state.filter(invoice => invoice.id !== action.payload.invoiceId);
    default:
      return state;
  }
}

export default combineReducers({
  newId: newIdReducer,
  list: listReducer,
}) as Reducer<IInvoicesState>;
