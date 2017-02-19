import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgRedux as Store } from '@angular-redux/store';
import { ActionsObservable } from 'redux-observable';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { IInvoice } from '../models/invoices.model';
import { IAction } from '../types/redux.types';
import { errorsActions, invoicesActions } from '@services/actions/';

@Injectable()
export default class FirebaseEffects {
  private invoices$: FirebaseListObservable<IInvoice[]>;

  constructor(private firebase: AngularFire, private store: Store<any>) {
    this.invoices$ = firebase.database.list('/invoices');
    this.invoices$.$ref.once('value', invoicesSnap => {
      const invoicesMap = invoicesSnap.val();
      Object.keys(invoicesMap).forEach(invoiceId => store.dispatch({
        type: invoicesActions.actionTypes.ADD_INVOICE_SUCCEEDED,
        payload: {
          invoice: { ...invoicesMap[invoiceId], id: invoiceId },
        },
      }));
    });
  }

  addInvoice = (actions$: ActionsObservable<IAction>) => {
    return actions$.ofType(invoicesActions.actionTypes.ADD_INVOICE_REQUESTED)
      .switchMap(action => {
        return Observable.from(this.invoices$.push(action.payload.invoice))
          .map(invoiceRef => {
            const invoice = { ...action.payload.invoice, id: invoiceRef.key };

            return {
              type: invoicesActions.actionTypes.ADD_INVOICE_SUCCEEDED,
              payload: { invoice },
            };
          })
          .catch((error) => Observable.of(errorsActions.showError(error)));
      });
  }
}
