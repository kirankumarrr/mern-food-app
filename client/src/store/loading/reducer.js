import { SET_LOADING, CLEAR_LOADING } from './type.js';

const initialState = {
    loadingList: {},
    isloading: false
};

export default function cart(state = initialState, action) {
    switch (action.type) {
        case SET_LOADING: {
            if (!(action.payload in state.loadingList)) {
                const getCurrentLoading = Object.assign({}, state.loadingList);
                getCurrentLoading[action.payload] = true;
                return {
                    ...state,
                    loadingList: getCurrentLoading,
                    isloading: !!Object.keys(getCurrentLoading).length
                };
            } else {
                return state;
            }
        }

        case CLEAR_LOADING: {
            if (action.payload in state.loadingList) {
                const getCurrentLoading = Object.assign({}, state.loadingList);
                delete getCurrentLoading[action.payload];
                return {
                    ...state,
                    loadingList: getCurrentLoading,
                    isloading: !!Object.keys(getCurrentLoading).length
                };
            } else {
                return state;
            }
        }

        default:
            return state;
    }
}
