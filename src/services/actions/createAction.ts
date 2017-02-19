import { IAction } from '../types/redux.types';
import { actionTypes as errorTypes, showError } from './errors.actions';

interface IPayloadCreators {
  request(...args: any[]): any;
  success(...args: any[]): any;
  failure?(errorMsg: string): any;
}

interface IActionCreator {
  types: { request: string; success: string; failure: string; };
  request(...args: any[]): IAction;
  success(...args: any[]): IAction;
  failure(errorMsg: string): IAction;
}

const defaultPayload = (args) => args;

export default function createAction(type: string, payloadCreators: IPayloadCreators): IActionCreator {
  const requestType = `${type}_REQUEST`;
  const successType = `${type}_SUCCESS`;
  const failureType = payloadCreators.failure ? `${type}_FAILURE` : errorTypes.SHOW_ERROR;

  return {
    types: { request: requestType, success: successType, failure: failureType },
    request(...args) {
      return {
        type: requestType,
        payload: payloadCreators.request ? payloadCreators.request(...args) : defaultPayload(args),
      };
    },
    success(...args) {
      return {
        type: successType,
        payload: payloadCreators.success ? payloadCreators.success(...args) : defaultPayload(args),
      };
    },
    failure(errorMsg: string) {
      if (payloadCreators.failure) {
        return {
          type: failureType,
          payload: payloadCreators.failure(errorMsg),
        };
      }

      return showError(errorMsg);
    },
  };
}
