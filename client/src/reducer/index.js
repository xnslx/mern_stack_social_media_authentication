import { combineReducers } from 'redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { loginReducer, signupReducer, backendDataReducer } from './authReducer';
import errorReducer from './errorReducer';

const initialState = {
    auth: {
        user: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    }
}

const rootReducer = combineReducers({
    auth: loginReducer,
    signup: signupReducer,
    backendData: backendDataReducer,
    error: errorReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;