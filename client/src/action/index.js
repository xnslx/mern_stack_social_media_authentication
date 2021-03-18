import axios from 'axios';

export const loginUser = (currentUser, history) => (dispatch) => {
    axios.post('http://localhost:3001/login', currentUser)
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
            dispatch({
                type: 'CLEAR_ERROR'
            })
        })
}

export const signupUser = (userInfo, history) => (dispatch) => {
    axios.post('http://localhost:3001/signup', userInfo)
        .then(result => {
            console.log('result', result)
            dispatch({
                type: 'SIGNUP_SUCCESS',
                payload: result
            })
            history.push('/login')
            console.log(result)
        })
        .catch(err => {
            console.log(err)
            dispatch({
                    type: 'SIGNUP_FAIL',
                    payload: err.response.data
                })
                // dispatch({
                //     type: 'CLEAR_ERROR'
                // })
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
        localStorage.setItem('userInfo', JSON.stringify(result.data.user))
        history.push('/profile')
    }).catch(err => {
        console.log(err)
    })
}

export const googleLogin = (data, history) => (dispatch) => {
    console.log('data', data)
    axios.post('http://localhost:3001/auth/google', {
        tokenId: data.tokenId
    }).then(response => {
        console.log('response', response)
        dispatch({
            type: 'GOOGLE_LOGIN_SUCCESS',
            payload: response.data
        })
        localStorage.setItem('userInfo', JSON.stringify(response.data.user))
        history.push('/profile')
    })
}

export const getProfileData = () => (dispatch) => {
    axios.get('http://localhost:3001/user/profile').then(result => {
        console.log(result)
        dispatch({
            type: 'GET_PROFILE_DATA',
            payload: result.data.user
        })
    }).catch(err => {
        console.log(err)
    })
}

export const getBackendData = result => {
    return {
        type: 'GET_BACKEND_DATA',
        payload: result
    }
}

export const retrievePassword = (email) => (dispatch) => {
    axios.post('http://localhost:3001/findpassword', email)
        .then(result => {
            dispatch(getBackendData(result.data))
        })
        .catch(err => {
            dispatch({
                type: 'GET_ERROR',
                payload: err.response.data
            })
        })
}

export const resetPassword = (verifiedPassword, history) => (dispatch) => {
    axios.post('http://localhost:3001/updatepassword', verifiedPassword)
        .then(result => {
            dispatch(getBackendData(result.data))
            history.push('/login')
        })
        .catch(err => {
            dispatch({
                type: 'GET_ERROR',
                payload: err.response.data
            })
        })
}

export const logout = (history) => (dispatch) => {
    axios.get('http://localhost:3001/logout').then(result => {
        console.log(result)
    }).catch(err => {
        console.log(err)
    })
    dispatch({
        type: 'LOGOUT'
    })
    localStorage.removeItem('userInfo')
    history.push('/')
}