import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';
import {GoogleLogin} from 'react-google-login';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {googleLogin} from '../../action/index';

require('dotenv').config()

const GoogleButton = (props) => {

    const responseGoogle = (response) => {
        console.log(response);
        props.dispatch(googleLogin(response, props.history))
    }

    return (
        <div>
            {/* <FontAwesomeIcon icon={faGoogle} style={{fontSize:'30px', color:'#4c69ba'}}/> */}
            <GoogleLogin
                clientId=""
                render={renderProps => (
                    <FontAwesomeIcon icon={faGoogle} onClick={renderProps.onClick} disabled={renderProps.disabled} style={{fontSize:'30px', color:'#4c69ba'}}/> 
                    )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
            {/* <a href="http://localhost:3001/auth/google">Sign In with Google</a> */}
        </div>
    )
};

const mapStateToProps = (state) => {
    console.log('state',state)
    return {
        auth: state.auth,
        error: state.error.message
    }
}

export default withRouter(connect(mapStateToProps)(GoogleButton));
