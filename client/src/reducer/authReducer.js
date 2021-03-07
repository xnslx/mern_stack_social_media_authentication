import * as actionTypes from '../action/types';

const initialState = {
    user: {},
    isAuthenticated: false,
    loading: true
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
        case actionTypes.FACEBOOK_LOGIN_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }
        case actionTypes.LOGIN_SUCCESS:
        case actionTypes.FACEBOOK_LOGIN_SUCCESS:
            return {
                loading: false,
                user: action.payload,
                isAuthenticated: true
            }
        case actionTypes.LOGIN_FAIL:
        case actionTypes.FACEBOOK_LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload,
                isAuthenticated: false
            }
        case actionTypes.USER_LOGOUT:
            return {}
        default:
            return state
    }
};

export default authReducer;