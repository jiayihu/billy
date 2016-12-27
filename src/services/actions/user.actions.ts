import { Action } from '@ngrx/store';
import { IUser } from '../model.service';

export const userActionTypes = {
  EDIT_USER: 'EDIT_USER',
};

export function editUser(user: IUser): Action {
  return {
    type: userActionTypes.EDIT_USER,
    payload: { user },
  };
}
