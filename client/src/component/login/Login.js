import React from 'react';
import FacebookButton from '../facebookbutton/FacebookButton';
import GoogleButton from '../googlebutton/GoogleButton';
// import TwitterButton from '../twitterbutton/TwitterButton';
import GithubButton from '../githubbutton/GithubButton';
import LoginForm from '../loginform/LoginForm';
const Login = () => {

    return (
        <div>
            <LoginForm />
            <FacebookButton />
            <GoogleButton />
            <GithubButton />
        </div>
    )
};

export default Login;
