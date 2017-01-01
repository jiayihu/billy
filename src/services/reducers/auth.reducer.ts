import { Action } from '../types/redux.types';
import { IAuth } from '../models/auth.model';
import { authActionTypes } from '../actions/auth.actions';

export type IAuthState = IAuth;

const initialState: IAuthState = {
  uuid: null,
};

export default function authReducer(state: IAuthState = initialState, action: Action): IAuthState {
  switch (action.type) {
    case authActionTypes.AUTH_USER:
      return action.payload.auth;
    case authActionTypes.LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
}
