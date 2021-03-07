import axios from 'axios';

export const loginUser = (currentUser, history) => (dispatch) => {
    axios.post('/login', currentUser)
        .then(result => {
            console.log('result', result)
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: result.data.user
            })
            history.push('/profile')
        })
        .catch(err => {
            console.log('err', err)
            dispatch({
                type: 'LOGIN_FAIL',
                payload: err.response.data
            })
        })
}

export const facebookLogin = (data, history) => (dispatch) => {
    axios.post('http://localhost:3001/auth/facebook', {
        access_token: data
    }).then(result => {
        console.log(result)
        dispatch({
            type: 'FACEBOOK_LOGIN_SUCCESS',
            payload: result.data.user
        })
        history.push('/profile')
    }).catch(err => {
        console.log(err)
    })
}