import { Middleware } from 'redux';

export interface IActionLifecycle {
  resolveType: string;
  rejectType: string;
}

/**
 * Middleware which allows to chain async actions as Promises.
 * @see https://github.com/redux-observable/redux-observable/issues/90
 * @example
 * const fetchSomething = () => ({
 *  type: FETCH_SOMETHING,
 *  meta: {
 *    lifecycle: {
 *      resolve: FETCH_SOMETHING_FULFILLED,
 *      reject: FETCH_SOMETHING_REJECTED
 *    }
 *  }
 * });
 *
 * Then you can use the action as following:
 * fetchSomething().then(action => doSomething(action))
 */
const middleware: Middleware = store => next => {
  const pending: { [key: string]: Function } = {};

  return (action: IAction) => {
    let returned;

    if (action.meta && action.meta.lifecycle) {
      returned = new Promise((resolve, reject) => {
        const lifecycle: IActionLifecycle = action.meta.lifecycle;
        const pendingResolves = pending[lifecycle.resolveType];
        const pendingRejections = pending[lifecycle.rejectType];

        pending[lifecycle.resolveType] = resolve;
        pending[lifecycle.rejectType] = reject;
      });
      next(action);
    } else {
      returned = next(action);
    }

    // This part is called later when the success/error action is dispatched
    if (pending[action.type]) {
      const actionCallback = pending[action.type];
      delete pending[action.type];
      actionCallback(action);
    }

    return returned;
  };
};

export default middleware;
