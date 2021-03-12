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
        // axios({
        //     method: "POST",
        //     url: "http://localhost:3001/auth/google",
        //     data: { tokenId: data.tokenId }
        // }).then(response => {
        //     console.log('response', response)
        // })
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