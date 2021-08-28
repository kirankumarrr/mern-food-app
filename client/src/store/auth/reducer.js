import {
  SIGN_UP,
  LOGIN,
  SET_CURRENT_USER,
  SIGN_UP_ERROR,
  GET_FORM_ERRORS,
} from '../types';

import { isEmpty } from '../../utils/isEmpty';

const initialState = {
  isLoggedIn: false,
  accessToken: null,
  isSignUpSuccess: false,
  errors: {},
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, accessToken: action.payload.token };
    case SIGN_UP:
      return { ...state, isSignUpSuccess: true };
    case SIGN_UP_ERROR:
      return { ...state };
    case SET_CURRENT_USER:
      return {
        ...state,
        isLoggedIn: !isEmpty(action.payload),
        user: action.payload,
      };
    case GET_FORM_ERRORS:
      return {
        ...state,
        isLoggedIn: !isEmpty(action.payload),
        errors: action.payload,
      };
    default:
      return state;
  }
}
