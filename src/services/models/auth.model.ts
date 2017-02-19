import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgRedux as Store } from '@angular-redux/store';
import { IState } from '@services/reducers/';
import { authActions } from '@services/actions/';
import { AngularFire } from 'angularfire2';
import { NotificationsService } from 'angular2-notifications';

export interface IAuth {
  isAuthenticated: boolean;
  uid: string;
}

@Injectable()
export default class AuthModel {
  auth$: Observable<IAuth>;

  constructor(
    private store: Store<IState>,
    private firebase: AngularFire,
    private notifications: NotificationsService,
  ) {
    this.auth$ = store.select('auth');

    const store$ = this.store.select(s => s);

    firebase.auth
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
