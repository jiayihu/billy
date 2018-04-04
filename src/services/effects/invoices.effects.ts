import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgRedux as Store } from '@angular-redux/store';
import { ActionsObservable } from 'redux-observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { IInvoice } from '../models/invoices.model';
import { invoicesActions } from '@services/actions/';

@Injectable()
export default class InvoicesEffects {
  private invoices$: AngularFireList<IInvoice[]>;

  constructor(
    private db: AngularFireDatabase,
    private firebaseAuth: AngularFireAuth,
    private store: Store<any>
  ) {
    firebaseAuth.authState.subscribe(authState => {
      if (!authState) return;

      const userId = authState.uid;
      this.invoices$ = db.list(`/invoices/${userId}`);

      // Add invoices to the store ad application startup
      this.invoices$
        .valueChanges()
        .first()
        .subscribe(invoices => {
          if (!invoices) return;

          store.dispatch(invoicesActions.addInvoices.success(invoices));
        });
    });
  }

  addInvoice = (actions$: ActionsObservable<IAction>) => {
    return actions$.ofType(invoicesActions.addInvoice.types.request).switchMap(action => {
      return Observable.from(this.invoices$.push(action.payload.invoice))
        .map(invoiceRef => {
          const invoice = { ...action.payload.invoice, id: invoiceRef.key };
          return invoicesActions.addInvoice.success(invoice);
        })
        .catch(error => Observable.of(invoicesActions.addInvoice.failure(error.message)));
    });
  };

  editInvoice = (actions$: ActionsObservable<IAction>) => {
    return actions$.ofType(invoicesActions.editInvoice.types.request).switchMap(action => {
      const invoice = action.payload.invoice;

      return Observable.from(this.invoices$.update(invoice.id, invoice))
        .map(() => invoicesActions.editInvoice.success(invoice))
        .catch(error => Observable.of(invoicesActions.editInvoice.failure(error.message)));
    });
  };

  deleteInvoice = (actions$: ActionsObservable<IAction>) => {
    return actions$.ofType(invoicesActions.deleteInvoice.types.request).switchMap(action => {
      const invoiceId = action.payload.invoiceId;

      return Observable.from(this.invoices$.remove(invoiceId))
        .map(() => invoicesActions.deleteInvoice.success(invoiceId))
        .catch(error => Observable.of(invoicesActions.deleteInvoice.failure(error.message)));
    });
  };
}
