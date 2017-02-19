import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgRedux as Store } from '@angular-redux/store';
import * as selectors from '@services/reducers/';
import { taxesActions } from '@services/actions/';
import BaseModel from './base.model';

export interface ITax {
  id: string;
  name: string;
  rate: number;
}

@Injectable()
export default class TaxesModel extends BaseModel {
  taxes$: Observable<ITax[]>;

  constructor(private store: Store<selectors.IState>) {
    super();
    this.taxes$ = this.store.select(selectors.getTaxes);
  }

  addTax(): ITax {
    let storedtaxes: ITax[];
    this.taxes$.first().subscribe(taxes => storedtaxes = taxes);
    console.log('storedTaxes: ', storedtaxes);
    const newTax: ITax = {
      id: this.generateId('TAX'),
      name: `Tax #${storedtaxes.length + 1}`,
      rate: 0,
    };
    this.store.dispatch(taxesActions.addTax(newTax));

    return newTax;
  }

  editTax(updatedTax: ITax) {
    this.store.dispatch(taxesActions.editTax(updatedTax));
  }

  deleteTax(taxId: string) {
    this.store.dispatch(taxesActions.deleteTax(taxId));
  }
}
