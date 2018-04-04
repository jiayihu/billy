import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgRedux as Store } from '@angular-redux/store';
import { ActionsObservable } from 'redux-observable';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { IUser } from '../models/user.model';
import { userActions } from '@services/actions/';

@Injectable()
export default class UserEffects {
  private user$: AngularFireObject<IUser>;

  constructor(
    private db: AngularFireDatabase,
    private firebaseAuth: AngularFireAuth,
    private store: Store<any>
  ) {
    firebaseAuth.authState.subscribe(authState => {
      if (!authState) return;

      const userId = authState.uid;
      this.user$ = db.object(`/users/${userId}`);

      this.user$
        .valueChanges()
        .first()
        .subscribe(user => {
          if (!user) return;

          store.dispatch(userActions.editUser.success(user));
        });
    });
  }

  editUser = (actions$: ActionsObservable<IAction>) => {
    return actions$.ofType(userActions.editUser.types.request).switchMap(action => {
      const user = action.payload.user;

      return Observable.from(this.user$.set(user))
        .map(() => userActions.editUser.success(user))
        .catch(error => Observable.of(userActions.editUser.failure(error.message)));
    });
  };
}
