import { Action as IBaseAction } from 'redux';

export interface IAction extends IBaseAction {
  readonly type: string;
  readonly payload?: any;
}
