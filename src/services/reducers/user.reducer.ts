import { IUser } from '../models/user.model';
import { userActions } from '../actions/';

export type IUserState = IUser;

const initialState: IUserState = {
  name: ''
};

export default function(state: IUserState = initialState, action: IAction): IUserState {
  switch (action.type) {
    case userActions.editUser.types.success:
      return { ...state, ...action.payload.user };
    default:
      return state;
  }
}
