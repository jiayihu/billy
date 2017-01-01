import { Action } from '../types/redux.types';
import { ITax } from '../models/taxes.model';
import { taxActionTypes } from '../actions/taxes.actions';

export type ITaxesState = ITax[];

export default function taxesReducer(state: ITaxesState = [], action: Action): ITaxesState {
  switch (action.type) {
    case taxActionTypes.ADD_TAX:
      return state.concat(action.payload.tax);
    case taxActionTypes.EDIT_TAX:
      return state.map(tax => {
        if (tax.id === action.payload.tax.id) return action.payload.tax;

        return tax;
      });
    case taxActionTypes.DELETE_TAX:
      return state.filter(tax => tax.id !== action.payload.taxId);
    default:
      return state;
  }
}
