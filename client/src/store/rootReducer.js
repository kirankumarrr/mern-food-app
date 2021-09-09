import { combineReducers } from 'redux';
import auth from './auth/reducer';
import cart from './cart/reducer';
import loading from './loading/reducer';
export default combineReducers({
    auth,
    cart,
    loading
});
