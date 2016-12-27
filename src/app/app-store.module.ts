import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import storage from '../utils/storage';
import rootReducer, { IState } from '@services/reducers/';
import { LOCALSTORAGE } from '@services/config.service';

let initialState: IState = storage.getItem(LOCALSTORAGE);

@NgModule({
  imports: [
    StoreModule.provideStore(rootReducer, initialState || undefined),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
  ],
})
export default class AppStoreModule {

}
