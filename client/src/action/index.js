import axios from 'axios';

export const loginUser = (currentUser, history) => (dispatch) => {
    axios.post('/login', currentUser)
        .then(result => {
            console.log('result', result)
                // const { token, user } = result.data;
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
                // dispatch({
                //     type: 'CLEAR_ERROR'
                // })
        })
}