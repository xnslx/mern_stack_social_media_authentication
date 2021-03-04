import React from 'react';
import FacebookButton from '../facebookbutton/FacebookButton';
import GoogleButton from '../googlebutton/GoogleButton';
// import TwitterButton from '../twitterbutton/TwitterButton';
import GithubButton from '../githubbutton/GithubButton';
const Login = () => {

    return (
        <div>
            <FacebookButton />
            <GoogleButton />
            <GithubButton />
            {/* <TwitterButton /> */}
            {/* <div>
              <a href="http://localhost:3001/facebook">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 16l1-5h-5V7c0-1.544.784-2 3-2h2V0h-4c-4.072 0-7 2.435-7 7v4H7v5h5v14h6V16h4z"
                  />
                </svg>
                <span>Log in with Facebook</span>
              </a>
            </div> */}
        </div>
    )
};

export default Login;
