import {
    SET_CART_ITEMS,
    SET_CART,
    CLEAR_CART,
    DELETE_CART_ITEMS
} from './type.js';

export const setCartItems = (foodItem) => async (dispatch) => {
    dispatch({
        type: SET_CART_ITEMS,
        payload: foodItem
    });
};
export const setCart = (cartList) => async (dispatch) => {
    dispatch({
        type: SET_CART,
        payload: cartList
    });
};
export const clearCartItems = (cartList) => async (dispatch) => {
    dispatch({
        type: CLEAR_CART,
        payload: cartList
    });
};
export const deleteCartItems = (id) => async (dispatch) => {
    dispatch({
        type: DELETE_CART_ITEMS,
        payload: id
    });
};
