import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgRedux as Store } from 'ng2-redux';
import * as selectors from '@services/reducers/';
import { authActions } from '@services/actions/';
import { AngularFire } from 'angularfire2';
import { NotificationsService } from 'angular2-notifications';

export interface IAuth {
  uuid: string;
}

@Injectable()
export default class AuthModel {
  auth$: Observable<IAuth>;

  constructor(
    private store: Store<selectors.IState>,
    private firebase: AngularFire,
    private notifications: NotificationsService
  ) {
    this.auth$ = store.select('auth');

    const store$ = this.store.select(s => s);

    // Wait for Store to be available, then subscribe for auth changes. Otherwise
    // Firebase could emit an auth object from localStorage before the Store is
    // created.
    store$
      .take(1)
      .concat(firebase.auth)
      .skip(1)
      .subscribe(auth => {
        if (auth && auth.auth) this.authenticate(auth.auth);
      });
  }

  authenticate(auth) {
    this.store.dispatch(authActions.authenticate(auth));
  }

  signup(email: string, password: string) {
    return this.firebase.auth.createUser({ email, password });
  }

  login(email: string, password: string) {
    return this.firebase.auth.login({ email, password });
  }

  logout() {
    this.store.dispatch(authActions.logoutUser());
    return this.firebase.auth.logout();
  }
}
