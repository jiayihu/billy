import { IAction } from '../types/redux.types';
import { ITax } from '../models/taxes.model';
import { actionTypes } from '../actions/taxes.actions';

export type ITaxesState = Readonly<ITax[]>;

export default function taxesReducer(state: ITaxesState = [], action: IAction): ITaxesState {
  switch (action.type) {
    case actionTypes.ADD_TAX:
      return state.concat(action.payload.tax);
    case actionTypes.EDIT_TAX:
      return state.map(tax => {
        if (tax.id === action.payload.tax.id) return action.payload.tax;

        return tax;
      });
    case actionTypes.DELETE_TAX:
      return state.filter(tax => tax.id !== action.payload.taxId);
    default:
      return state;
  }
}
