import { Action } from '../types/redux.types';
import { IAuth } from '../models/auth.model';
import { authActionTypes } from '../actions/auth.actions';

export type IAuthState = Readonly<IAuth>;

const initialState: IAuthState = {
  isAuthenticated: false,
  uid: null,
};

export default function authReducer(state: IAuthState = initialState, action: Action): IAuthState {
  switch (action.type) {
    case authActionTypes.AUTH_USER:
      return {
        uid: action.payload.auth.uid,
        isAuthenticated: true,
      };
    case authActionTypes.LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
}
