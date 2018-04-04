export const actionTypes = {
  SHOW_ERROR: 'SHOW_ERROR'
};

export function showError(msg: string): IAction {
  return {
    type: actionTypes.SHOW_ERROR,
    payload: { msg }
  };
}
