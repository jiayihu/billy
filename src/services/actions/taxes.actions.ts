import { IAction } from '../types/redux.types';
import { ITax } from '../models/taxes.model';

export const actionTypes = {
  ADD_TAX: 'ADD_TAX',
  EDIT_TAX: 'EDIT_TAX',
  DELETE_TAX: 'DELETE_TAX',
};

export function addTax(tax: ITax): IAction {
  return {
    type: actionTypes.ADD_TAX,
    payload: { tax },
  };
}

export function editTax(tax: ITax): IAction {
  return {
    type: actionTypes.EDIT_TAX,
    payload: { tax },
  };
}

export function deleteTax(taxId: string): IAction {
  return {
    type: actionTypes.DELETE_TAX,
    payload: { taxId },
  };
}
