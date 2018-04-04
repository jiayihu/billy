import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgRedux as Store } from '@angular-redux/store';
import * as selectors from '@services/reducers/';
import { taxesActions } from '@services/actions/';

export interface ITax {
  id: string;
  name: string;
  rate: number;
}

@Injectable()
export default class TaxesModel {
  private taxes: ITax[];
  taxes$: Observable<ITax[]>;

  constructor(private store: Store<selectors.IState>) {
    this.taxes$ = this.store.select(selectors.getTaxes);
    this.taxes$.subscribe(taxes => (this.taxes = taxes));
  }

  addTax(): Promise<ITax> {
    const taxIndex = this.taxes ? this.taxes.length + 1 : 1;
    const newTax: ITax = {
      id: '',
      name: `Tax #${taxIndex}`,
      rate: 0
    };

    return (this.store as any)
      .dispatch(taxesActions.addTax.request(newTax))
      .then(response => response.payload.tax);
  }

  editTax(updatedTax: ITax) {
    this.store.dispatch(taxesActions.editTax.request(updatedTax));
  }

  deleteTax(taxId: string) {
    this.store.dispatch(taxesActions.deleteTax.request(taxId));
  }
}
