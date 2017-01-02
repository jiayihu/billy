import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgRedux as Store } from 'ng2-redux';
import { IState } from '@services/reducers/';
import { userActions } from '@services/actions/';

export interface IUser {
  name: string;
  vat?: string;
  address?: string;
  city?: string;
  zip?: string;
  country?: string;
  province?: string;
}

@Injectable()
export default class UserModel {
  user$: Observable<IUser>;

  constructor(private store: Store<IState>) {
    this.user$ = store.select('user');
  }

  editUser(value): void {
    this.store.dispatch(userActions.editUser(value));
  }
}
