import { IUser } from '../models/user.model';
import createAction from './createAction';

export const editUser = createAction('EDIT_USER', {
  request: user => ({ user }),
  success: user => ({ user })
});
