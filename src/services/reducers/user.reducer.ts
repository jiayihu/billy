import { IAction } from '../types/redux.types';
import { IUser } from '../models/user.model';
import { userActionTypes } from '../actions/user.actions';

export type IUserState = Readonly<IUser>;

const initialState: IUserState = {
  name: '',
};

export default function(state: IUserState = initialState, action: IAction): IUserState {
  switch (action.type) {
    case userActionTypes.EDIT_USER:
      return { ...state, ...action.payload.user };
    default:
      return state;
  }
}
