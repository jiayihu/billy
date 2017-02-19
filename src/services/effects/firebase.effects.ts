import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgRedux as Store } from '@angular-redux/store';
import { ActionsObservable } from 'redux-observable';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { IInvoice } from '../models/invoices.model';
import { IAction } from '../types/redux.types';
import { invoicesActions } from '@services/actions/';

@Injectable()
export default class FirebaseEffects {
  private invoices$: FirebaseListObservable<IInvoice[]>;

  constructor(private firebase: AngularFire, private store: Store<any>) {
    this.invoices$ = firebase.database.list('/invoices');
    this.invoices$.$ref.once('value', invoicesSnap => {
      const invoicesMap = invoicesSnap.val();
      Object.keys(invoicesMap).forEach(invoiceId => {
        const invoice = { ...invoicesMap[invoiceId], id: invoiceId };
        store.dispatch(invoicesActions.addInvoice.success(invoice));
      });
    });
  }

  addInvoice = (actions$: ActionsObservable<IAction>) => {
    return actions$.ofType(invoicesActions.addInvoice.types.request)
      .switchMap(action => {
        return Observable.from(this.invoices$.push(action.payload.invoice))
          .map(invoiceRef => {
            const invoice = { ...action.payload.invoice, id: invoiceRef.key };
            return invoicesActions.addInvoice.success(invoice);
          })
          .catch((error) => Observable.of(invoicesActions.addInvoice.failure(error.message || error)));
      });
  }
}
