import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgRedux as Store } from '@angular-redux/store';
import { ActionsObservable } from 'redux-observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { ITax } from '../models/taxes.model';
import { taxesActions } from '@services/actions/';

@Injectable()
export default class TaxesEffects {
  private taxes$: AngularFireList<ITax[]>;

  constructor(
    private db: AngularFireDatabase,
    private firebaseAuth: AngularFireAuth,
    private store: Store<any>
  ) {
    firebaseAuth.authState.subscribe(authState => {
      if (!authState) return;

      const userId = authState.uid;
      this.taxes$ = db.list(`/taxes/${userId}`);

      // Add taxes to the store ad application startup
      this.taxes$
        .valueChanges()
        .first()
        .subscribe(taxes => {
          if (!taxes) return;

          store.dispatch(taxesActions.addTaxes.success(taxes));
        });
    });
  }

  addTax = (actions$: ActionsObservable<IAction>) => {
    return actions$.ofType(taxesActions.addTax.types.request).switchMap(action => {
      return Observable.from(this.taxes$.push(action.payload.tax))
        .map(taxRef => {
          const tax = { ...action.payload.tax, id: taxRef.key };
          return taxesActions.addTax.success(tax);
        })
        .catch(error => Observable.of(taxesActions.addTax.failure(error.message)));
    });
  };

  editTax = (actions$: ActionsObservable<IAction>) => {
    return actions$.ofType(taxesActions.editTax.types.request).switchMap(action => {
      const tax = action.payload.tax;

      return Observable.from(this.taxes$.update(tax.id, tax))
        .map(() => taxesActions.editTax.success(tax))
        .catch(error => Observable.of(taxesActions.editTax.failure(error.message)));
    });
  };

  deleteTax = (actions$: ActionsObservable<IAction>) => {
    return actions$.ofType(taxesActions.deleteTax.types.request).switchMap(action => {
      const taxId = action.payload.taxId;

      return Observable.from(this.taxes$.remove(taxId))
        .map(() => taxesActions.deleteTax.success(taxId))
        .catch(error => Observable.of(taxesActions.deleteTax.failure(error.message)));
    });
  };
}
