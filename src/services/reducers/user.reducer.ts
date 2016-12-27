import { Action } from '@ngrx/store';
import { IUser } from '../model.service';
import { userActionTypes } from '../actions/user.actions';

export type IUserState = IUser;

const initialState: IUserState = {
  name: '',
};

export default function(state: IUserState = initialState, action: Action): IUserState {
  switch (action.type) {
    case userActionTypes.EDIT_USER:
      return { ...state, ...action.payload.user };
    default:
      return state;
  }
}
