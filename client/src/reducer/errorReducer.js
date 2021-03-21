// import { GET_ERROR, CLEAR_ERROR, LOGIN_FAIL } from '../action/types';

const initialState = {
    message: null,
    hasError: false,
    type: ""
};

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ERROR':
        case 'LOGIN_FAIL':
        case 'SIGNUP_FAIL':
            return {
                ...state,
                message: action.payload,
                hasError: true,
                type: action.payload.type
            }
        case 'CLEAR_ERROR':
            return {
                ...state,
                message: '',
                hasError: false,
                type: ''
            }
        default:
            return state
    }
}


export default errorReducer;