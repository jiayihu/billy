import { ITax } from '../models/taxes.model';
import { taxesActions } from '../actions/';

export type ITaxesState = ITax[];

export default function taxesReducer(state: ITaxesState = [], action: IAction): ITaxesState {
  switch (action.type) {
    case taxesActions.addTaxes.types.success:
      return action.payload.taxes;
    case taxesActions.addTax.types.success:
      return state.concat(action.payload.tax);
    case taxesActions.editTax.types.success:
      return state.map(tax => {
        if (tax.id === action.payload.tax.id) return action.payload.tax;

        return tax;
      });
    case taxesActions.deleteTax.types.success:
      return state.filter(tax => tax.id !== action.payload.taxId);
    default:
      return state;
  }
}
