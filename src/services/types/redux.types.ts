import { Action as IBaseAction } from 'redux';

// tslint:disable-next-line
export interface Action extends IBaseAction {
  type: string;
  payload?: any;
}
