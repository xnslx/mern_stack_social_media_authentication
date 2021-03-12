import { combineReducers } from 'redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { loginReducer, signupReducer, backendDataReducer } from './authReducer';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
    auth: loginReducer,
    signup: signupReducer,
    backendData: backendDataReducer,
    error: errorReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;