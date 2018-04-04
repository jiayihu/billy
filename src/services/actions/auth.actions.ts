export const actionTypes = {
  AUTH_USER: 'AUTH_USER',
  LOGOUT_USER: 'LOGOUT_USER'
};

export function authenticate(auth): IAction {
  return {
    type: actionTypes.AUTH_USER,
    payload: { auth }
  };
}

export function logoutUser(): IAction {
  return { type: actionTypes.LOGOUT_USER };
}
