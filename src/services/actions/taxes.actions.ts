import { ITax } from '../models/taxes.model';
import createAction from './createAction';

export const addTaxes = createAction('ADD_TAXES', {
  success: taxes => ({ taxes })
});

export const addTax = createAction(
  'ADD_TAX',
  {
    request: tax => ({ tax }),
    success: tax => ({ tax })
  },
  { lifecycle: true }
);

export const editTax = createAction('EDIT_TAX', {
  request: tax => ({ tax }),
  success: tax => ({ tax })
});

export const deleteTax = createAction('DELETE_TAX', {
  request: taxId => ({ taxId }),
  success: taxId => ({ taxId })
});
