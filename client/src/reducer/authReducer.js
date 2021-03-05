import * as actionTypes from '../action/types';

const initialState = {
    user: {},
    isAuthenticated: false,
    loading: true
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
            return {
                loading: true
            }
        case actionTypes.LOGIN_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }
        case actionTypes.LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case actionTypes.USER_LOGOUT:
            return {}
        default:
            return state
    }
};

export default authReducer;