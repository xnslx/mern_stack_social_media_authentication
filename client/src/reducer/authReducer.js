import * as actionTypes from '../action/types';

const initialState = {
    user: {},
    isAuthenticated: false,
    loading: true
}

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
        case actionTypes.FACEBOOK_LOGIN_REQUEST:
        case actionTypes.GOOGLE_LGOIN_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }
        case actionTypes.LOGIN_SUCCESS:
        case actionTypes.FACEBOOK_LOGIN_SUCCESS:
        case actionTypes.GET_PROFILE_DATA:
            return {
                loading: false,
                user: action.payload,
                isAuthenticated: true
            }
        case actionTypes.GOOGLE_LOGIN_SUCCESS:
            return {
                loading: false,
                user: action.payload.user,
                isAuthenticated: true
            }
        case actionTypes.LOGIN_FAIL:
        case actionTypes.FACEBOOK_LOGIN_FAIL:
        case actionTypes.GOOGLE_LOGIN_FAIL:
            return {
                loading: false,
                isAuthenticated: false
            }
        case actionTypes.USER_LOGOUT:
            return {}
        default:
            return state
    }
};

export const signupReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SIGNUP_REQUEST:
            return {
                loading: true
            }
        case actionTypes.SIGNUP_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }
        case actionTypes.SIGNUP_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}


const initialBackendDataState = {
    backendData: ''
}

export const backendDataReducer = (state = initialBackendDataState, action) => {
        switch (action.type) {
            case 'GET_BACKEND_DATA':
                return {
                    ...state,
                    backendData: action.payload
                }
            default:
                return state;
        }
    }
    // export default authReducer;