import React, {useState, useEffect} from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

const FacebookButton = () => {
    const [accessToken, setAccessToken] = useState('')

    const componentClicked = () => {
        console.log('clicked');
    }
    const requestAuthenticationfrombackend = () => {
        axios.post('/auth/facebook', {
            accessToken:accessToken
        }).then(result => {
            console.log(result)
        }).catch(err => {
            console.log(err)
        })
    }
    useEffect(() => {
        requestAuthenticationfrombackend()
    })
    const responseFacebook = (response) => {
        console.log(response)
        setAccessToken(response.accessToken)
    }
    return (
        <div>
            <FacebookLogin
                appId=""
                autoLoad={false}
                fields="name,email"
                onClick={componentClicked}
                callback={responseFacebook} 
            />
        </div>
    )
};

export default FacebookButton;
