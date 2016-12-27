import { Action } from '@ngrx/store';
import { ITax } from '../model.service';

export const taxActionTypes = {
  ADD_TAX: 'ADD_TAX',
  EDIT_TAX: 'EDIT_TAX',
  DELETE_TAX: 'DELETE_TAX',
};

export function addTax(tax: ITax): Action {
  return {
    type: taxActionTypes.ADD_TAX,
    payload: { tax },
  };
}

export function editTax(tax: ITax): Action {
  return {
    type: taxActionTypes.EDIT_TAX,
    payload: { tax },
  };
}

export function deleteTax(taxId: string): Action {
  return {
    type: taxActionTypes.DELETE_TAX,
    payload: { taxId },
  };
}
