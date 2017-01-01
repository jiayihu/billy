import { Action } from '../types/redux.types';
import { IUser } from '../models/user.model';

export const userActionTypes = {
  EDIT_USER: 'EDIT_USER',
};

export function editUser(user: IUser): Action {
  return {
    type: userActionTypes.EDIT_USER,
    payload: { user },
  };
}
