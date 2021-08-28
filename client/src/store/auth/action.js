//TODO : Create methods for Auth
/**
 * SingUP
 * Login
 * Logout
 */

import { SET_CURRENT_USER } from '../types';
import setAuthToken from '../../utils/setAuthToken';

export const setCurrentUser = (decoded) => async (dispatch) => {
  dispatch({
    type: SET_CURRENT_USER,
    payload: decoded,
  });
};

export const signOut = () => (dispatch) => {
  /**
   * TODO
   * 1) Clean cookies
   * 2) delete token from axois header : call setAuthToken
   * 3) clear redux current user data
   */
  document.cookie = `jwtToken=; expires= ${new Date().toUTCString()}`;
  setAuthToken(null);
  dispatch(setCurrentUser({}));
};
