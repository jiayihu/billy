import { NgModule } from '@angular/core';
import { applyMiddleware, Store, compose, createStore } from 'redux';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import storage from '@utils/storage';
import rootReducer, { IState } from '@services/reducers/';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { effects, FirebaseEffects } from '@services/effects/';
import { LOCALSTORAGE } from '@services/config.service';

@NgModule({
  imports: [ NgReduxModule ],
  providers: [...effects],
})
export default class AppStoreModule {
  constructor(
    redux: NgRedux<IState>,
    firebaseEffects: FirebaseEffects,
  ) {
    let initialState: IState = storage.getItem(LOCALSTORAGE);
    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const epics = combineEpics(firebaseEffects.addInvoice);

    const store: Store<IState> = createStore(
      rootReducer,
      initialState || undefined,
      composeEnhancers(applyMiddleware(
        createEpicMiddleware(epics),
      )),
    );

    redux.provideStore(store);

    const store$ = redux.select(s => s);

    store$
      .debounceTime(300)
      .skip(1) // No need to persist again the initialState
      .distinctUntilChanged()
      .subscribe(appState => {
        storage.setItem(LOCALSTORAGE, appState);
      });
  }
}
