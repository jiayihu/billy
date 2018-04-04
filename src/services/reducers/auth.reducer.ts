import { IAuth } from '../models/auth.model';
import { actionTypes } from '../actions/auth.actions';

export type IAuthState = IAuth;

const initialState: IAuthState = {
  isAuthenticated: false,
  uid: null
};

export default function authReducer(state: IAuthState = initialState, action: IAction): IAuthState {
  switch (action.type) {
    case actionTypes.AUTH_USER:
      return {
        uid: action.payload.auth.uid,
        isAuthenticated: true
      };
    case actionTypes.LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
}
