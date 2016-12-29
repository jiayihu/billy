import { Action } from '../types/redux.types';

export const authActionTypes = {
  AUTH_USER: 'AUTH_USER',
};

export function authenticate(auth): Action {
  return {
    type: authActionTypes.AUTH_USER,
    payload: { auth },
  };
}
