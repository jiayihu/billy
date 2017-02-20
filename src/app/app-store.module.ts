import { NgModule } from '@angular/core';
import { applyMiddleware, Store, compose, createStore } from 'redux';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import rootReducer, { IState } from '@services/reducers/';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { effects, InvoicesEffects, CustomersEffects, TaxesEffects } from '@services/effects/';
import { LOCALSTORAGE } from '@services/config.service';

@NgModule({
  imports: [ NgReduxModule ],
  providers: [...effects],
})
export default class AppStoreModule {
  constructor(
    redux: NgRedux<IState>,
    firebaseEffects: InvoicesEffects,
    customersEffects: CustomersEffects,
    taxesEffects: TaxesEffects,
  ) {
    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const epics = combineEpics(
      firebaseEffects.addInvoice,
      firebaseEffects.editInvoice,
      firebaseEffects.deleteInvoice,
      customersEffects.addCustomer,
      customersEffects.editCustomer,
      customersEffects.deleteCustomer,
      taxesEffects.addTax,
      taxesEffects.editTax,
      taxesEffects.deleteTax,
    );

    const store: Store<IState> = createStore(
      rootReducer,
      undefined,
      composeEnhancers(applyMiddleware(
        createEpicMiddleware(epics),
      )),
    );

    redux.provideStore(store);
  }
}
