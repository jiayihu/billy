import { IAction } from '../types/redux.types';

export const authActionTypes = {
  AUTH_USER: 'AUTH_USER',
  LOGOUT_USER: 'LOGOUT_USER',
};

export function authenticate(auth): IAction {
  return {
    type: authActionTypes.AUTH_USER,
    payload: { auth },
  };
}

export function logoutUser(): IAction {
  return { type: authActionTypes.LOGOUT_USER };
}
