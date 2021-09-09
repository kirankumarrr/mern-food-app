import {
    SET_CART_ITEMS,
    SET_CART,
    CLEAR_CART,
    DELETE_CART_ITEMS
} from './type.js';

const getrestaurantId = (cartDetails) => {
    const id = cartDetails.length > 0 ? cartDetails[0].restaurantId : null;
    return id;
};

const initialState = {
    cart: [],
    restaurantId: null
};

export default function cart(state = initialState, action) {
    switch (action.type) {
        case SET_CART: {
            return {
                ...state,
                cart: action.payload,
                restaurantId: getrestaurantId(action.payload)
            };
        }

        case SET_CART_ITEMS: {
            const getCartItems = Object.assign([], state.cart);
            const found = getCartItems.findIndex(
                (item) => item.foodId === action.payload.foodId
            );
            if (found !== -1) {
                getCartItems[found].quantity += 1;
                return {
                    ...state,
                    cart: getCartItems,
                    restaurantId: action.payload.restaurantId
                };
            }

            return {
                ...state,
                cart: [...getCartItems, action.payload],
                restaurantId: action.payload.restaurantId
            };
        }
        case CLEAR_CART:
            return { ...state, cart: [], restaurantId: null };
        case DELETE_CART_ITEMS: {
            const cleaned = state.cart.filter(
                (record) => record.foodId !== action.payload
            );
            return {
                ...state,
                cart: cleaned,
                restaurantId: getrestaurantId(cleaned)
            };
        }
        default:
            return state;
    }
}
