import React from 'react';
// import FacebookLogin from 'react-facebook-login';
// import axios from 'axios';

const FacebookButton = () => {
    // const [accessToken, setAccessToken] = useState('');
    // const [isLoggedIn, setIsLoggedIn] = useState(false)

    // const componentClicked = () => {
    //     console.log('clicked');
    // }

    // const responseFacebook = (response) => {
    //     console.log(response)
    //     setAccessToken(response.accessToken)
    //     setIsLoggedIn(true)
    // }

    // useEffect(() => {
    //     axios.post('/auth/facebook/', {
    //         token:accessToken
    //     }).then(result => {
    //         console.log(result)
    //     }).catch(err => {
    //         console.log(err)
    //     })
    // })


    return (
        <div>
            {/* <FacebookLogin
                appId=""
                autoLoad={false}
                fields="name,email"
                onClick={componentClicked}
                callback={responseFacebook} 
            /> */}
            <a href="http://localhost:3001/auth/facebook">Login with Facebook</a>
        </div>
    )
};

export default FacebookButton;
