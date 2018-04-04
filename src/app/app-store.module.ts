import { NgModule } from '@angular/core';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import rootReducer, { IState } from '@services/reducers/';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import {
  effects,
  InvoicesEffects,
  CustomersEffects,
  TaxesEffects,
  UserEffects
} from '@services/effects/';
import { LOCALSTORAGE } from '@services/config.service';
import actionLifecycleMidleware from '@services/middlewares/action-lifecycle.middleware';

@NgModule({
  imports: [NgReduxModule],
  providers: [...effects]
})
export default class AppStoreModule {
  constructor(
    redux: NgRedux<IState>,
    reduxDevtools: DevToolsExtension,
    invoicesEffects: InvoicesEffects,
    customersEffects: CustomersEffects,
    taxesEffects: TaxesEffects,
    userEffects: UserEffects
  ) {
    const epics = combineEpics(
      invoicesEffects.addInvoice,
      invoicesEffects.editInvoice,
      invoicesEffects.deleteInvoice,
      customersEffects.addCustomer,
      customersEffects.editCustomer,
      customersEffects.deleteCustomer,
      taxesEffects.addTax,
      taxesEffects.editTax,
      taxesEffects.deleteTax,
      userEffects.editUser
    );
    const middlewares = [createEpicMiddleware(epics), actionLifecycleMidleware];
    const enhancers = reduxDevtools.isEnabled() ? [reduxDevtools.enhancer()] : [];

    redux.configureStore(rootReducer, undefined, middlewares, enhancers);
  }
}
