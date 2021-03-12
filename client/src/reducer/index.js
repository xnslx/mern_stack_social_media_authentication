import { combineReducers } from 'redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { authReducer, signupReducer } from './authReducer';
import errorReducer from './errorReducer';
// import Cookies from 'js-cookie';


// const initialState = {
//     auth: {
//         user: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
//     }
// }


const rootReducer = combineReducers({
    auth: authReducer,
    signup: signupReducer,
    error: errorReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;