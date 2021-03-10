import React from 'react';
import FacebookButton from '../facebookbutton/FacebookButton';
import GoogleButton from '../googlebutton/GoogleButton';
// import TwitterButton from '../twitterbutton/TwitterButton';
import GithubButton from '../githubbutton/GithubButton';
import LoginForm from '../loginform/LoginForm';
import classes from './Login.module.css';


const Login = () => {

    return (
        <div>
            <LoginForm />
            <div className={classes.SocialButton}>
                <FacebookButton />
                <GoogleButton />
                <GithubButton />
            </div>
        </div>
    )
};

export default Login;
