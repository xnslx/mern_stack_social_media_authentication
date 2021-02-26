import React, {useState, useEffect} from 'react';
import FacebookLogin from 'react-facebook-login';
// import axios from 'axios';

const FacebookButton = () => {
    // const [accessToken, setAccessToken] = useState('')

    // const componentClicked = () => {
    //     console.log('clicked');
    // }

    // const responseFacebook = (response) => {
    //     console.log(response)
    //     setAccessToken(response.accessToken)
    // }
    return (
        <div>
            {/* <FacebookLogin
                appId=""
                autoLoad={false}
                fields="name,email"
                onClick={componentClicked}
                callback={responseFacebook} 
            /> */}
            <a href="http://localhost:3001/facebook">Login with Facebook</a>
        </div>
    )
};

export default FacebookButton;
