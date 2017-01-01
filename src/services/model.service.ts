import { Injectable } from '@angular/core';
import { NgRedux as Store } from 'ng2-redux';
import * as selectors from '@services/reducers/';
import ConfigService from '@services/config.service';
import storage from '../utils/storage';
import BaseModel from './models/base.model';

@Injectable()
export default class ModelService extends BaseModel {
  constructor(
    private store: Store<selectors.IState>,
    private config: ConfigService
  ) {
    super();
    const store$ = this.store.select(s => s);

    store$
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(appState => {
        storage.setItem(this.config.get('LOCALSTORAGE'), appState);
      });
  }
}
