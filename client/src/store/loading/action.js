import { SET_LOADING, CLEAR_LOADING } from './type.js';

export const setLoading = (key) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: key,
  });
};
export const clearLoading = (key) => async (dispatch) => {
  dispatch({
    type: CLEAR_LOADING,
    payload: key,
  });
};
