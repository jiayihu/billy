import { IAction } from '../types/redux.types';
import { IUser } from '../models/user.model';

export const actionTypes = {
  EDIT_USER: 'EDIT_USER',
};

export function editUser(user: IUser): IAction {
  return {
    type: actionTypes.EDIT_USER,
    payload: { user },
  };
}
