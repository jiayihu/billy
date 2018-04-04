import { IInvoice } from '../models/invoices.model';
import createAction from './createAction';

export const addInvoices = createAction('ADD_INVOICES', {
  success: invoices => ({ invoices })
});

export const addInvoice = createAction(
  'ADD_INVOICE',
  {
    request: invoice => ({ invoice }),
    success: invoice => ({ invoice })
  },
  { lifecycle: true }
);

export const editInvoice = createAction('EDIT_INVOICE', {
  request: invoice => ({ invoice }),
  success: invoice => ({ invoice })
});

export const deleteInvoice = createAction('DELETE_INVOICE', {
  request: invoiceId => ({ invoiceId }),
  success: invoiceId => ({ invoiceId })
});
