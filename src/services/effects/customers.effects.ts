import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgRedux as Store } from '@angular-redux/store';
import { ActionsObservable } from 'redux-observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { ICustomer } from '../models/customers.model';
import { customersActions } from '@services/actions/';

@Injectable()
export default class CustomersEffects {
  private customers$: AngularFireList<ICustomer[]>;

  constructor(
    private db: AngularFireDatabase,
    private firebaseAuth: AngularFireAuth,
    private store: Store<any>
  ) {
    firebaseAuth.authState.subscribe(authState => {
      if (!authState) return;

      const userId = authState.uid;
      this.customers$ = db.list(`/customers/${userId}`);

      // Add customers to the store at application startup
      this.customers$
        .valueChanges()
        .first()
        .subscribe(customers => {
          if (!customers) return;

          store.dispatch(customersActions.addCustomers.success(customers));
        });
    });
  }

  addCustomer = (actions$: ActionsObservable<IAction>) => {
    return actions$.ofType(customersActions.addCustomer.types.request).switchMap(action => {
      return Observable.from(this.customers$.push(action.payload.customer))
        .map(customerRef => {
          const customer = { ...action.payload.customer, id: customerRef.key };
          return customersActions.addCustomer.success(customer);
        })
        .catch(error => Observable.of(customersActions.addCustomer.failure(error.message)));
    });
  };

  editCustomer = (actions$: ActionsObservable<IAction>) => {
    return actions$.ofType(customersActions.editCustomer.types.request).switchMap(action => {
      const customer = action.payload.customer;

      return Observable.from(this.customers$.update(customer.id, customer))
        .map(() => customersActions.editCustomer.success(customer))
        .catch(error => Observable.of(customersActions.editCustomer.failure(error.message)));
    });
  };

  deleteCustomer = (actions$: ActionsObservable<IAction>) => {
    return actions$.ofType(customersActions.deleteCustomer.types.request).switchMap(action => {
      const customerId = action.payload.customerId;

      return Observable.from(this.customers$.remove(customerId))
        .map(() => customersActions.deleteCustomer.success(customerId))
        .catch(error => Observable.of(customersActions.deleteCustomer.failure(error.message)));
    });
  };
}
