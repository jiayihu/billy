import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgRedux as Store } from '@angular-redux/store';
import { ActionsObservable } from 'redux-observable';
import { AngularFire, FirebaseAuth, FirebaseObjectObservable } from 'angularfire2';
import { IUser } from '../models/user.model';
import { IAction } from '../types/redux.types';
import { userActions } from '@services/actions/';

@Injectable()
export default class UserEffects {
  private user$: FirebaseObjectObservable<IUser>;

  constructor(private firebase: AngularFire, private firebaseAuth: FirebaseAuth, private store: Store<any>) {
    firebaseAuth.subscribe(authState => {
      const userId = authState.uid;
      this.user$ = firebase.database.object(`/users/${userId}`);

      this.user$.$ref.once('value', userSnap => {
        const user = userSnap.val();
        if (!user) return;

        store.dispatch(userActions.editUser.success(user));
      });
    });
  }

  editUser = (actions$: ActionsObservable<IAction>) => {
    return actions$.ofType(userActions.editUser.types.request)
      .switchMap(action => {
        const user = action.payload.user;

        return Observable.from(this.user$.set(user))
          .map(() => userActions.editUser.success(user))
          .catch((error) => Observable.of(userActions.editUser.failure(error.message)));
      });
  }
}
