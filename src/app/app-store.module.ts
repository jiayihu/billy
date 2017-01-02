import { NgModule } from '@angular/core';
import { applyMiddleware, Store, compose, createStore } from 'redux';
import { NgReduxModule, NgRedux } from 'ng2-redux';
import storage from '../utils/storage';
import rootReducer, { IState } from '@services/reducers/';
import { LOCALSTORAGE } from '@services/config.service';

let initialState: IState = storage.getItem(LOCALSTORAGE);

const composeEnhancers = (<any> window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store: Store<IState> = createStore(
  rootReducer,
  initialState || undefined,
  composeEnhancers(applyMiddleware())
);

@NgModule({
  imports: [
    NgReduxModule,
  ],
})
export default class AppStoreModule {
  constructor(redux: NgRedux<IState>) {
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
