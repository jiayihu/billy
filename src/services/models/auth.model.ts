import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AsyncSubject } from 'rxjs/AsyncSubject';
import { NgRedux as Store } from '@angular-redux/store';
import { IState } from '@services/reducers/';
import { authActions } from '@services/actions/';
import { AngularFireAuth } from 'angularfire2/auth';
import { NotificationsService } from 'angular2-notifications';

export interface IAuth {
  isAuthenticated: boolean;
  uid: string;
}

@Injectable()
export default class AuthModel {
  auth$: Observable<IAuth>;
  checkedAuth$ = new AsyncSubject<boolean>();

  constructor(
    private store: Store<IState>,
    private firebaseAuth: AngularFireAuth,
    private notifications: NotificationsService
  ) {
    this.auth$ = store.select('auth');

    const store$ = this.store.select(s => s);

    firebaseAuth.authState.subscribe(auth => {
      if (auth) this.authenticate(auth.toJSON());
      this.checkedAuth$.next(true);
      this.checkedAuth$.complete();
    });
  }

  authenticate(auth) {
    this.store.dispatch(authActions.authenticate(auth));
  }

  signup(email: string, password: string) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.store.dispatch(authActions.logoutUser());
    return this.firebaseAuth.auth.signOut();
  }
}
