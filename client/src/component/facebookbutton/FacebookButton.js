import React  from 'react';
// import FacebookLogin from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {facebookLogin} from '../../action/index';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebookSquare} from '@fortawesome/free-brands-svg-icons';


const FacebookButton = (props) => {

    const componentClicked = () => {
        console.log('clicked');
    }

    const responseFacebook = (response) => {
        console.log(response)
        props.dispatch(facebookLogin(response.accessToken, props.history))
    }

    return (
        <div style={{marginTop:'-200px', width: '60vw', marginLeft:'auto', marginRight:'auto'}}>
            {/* <FontAwesomeIcon icon={faFacebookSquare} style={{fontSize:'36px', color:'#4c69ba'}}/> */}
            {/* <FacebookLogin
                appId="431464294788204"
                autoLoad={false}
                fields="name,email"
                onClick={componentClicked}
                callback={responseFacebook}
            /> */}
            <FacebookLogin
                appId="431464294788204"
                autoLoad={false}
                fields="name,email"
                onClick={componentClicked}
                callback={responseFacebook}
                render={renderProps => (
                    <FontAwesomeIcon onClick={renderProps.onClick} icon={faFacebookSquare} style={{fontSize:'36px', color:'#4c69ba'}}/>                    
                )}
            />
            {/* <a href="http://localhost:3001/auth/facebook">Login with Facebook</a>*/}
        </div>
    )
};

const mapStateToProps = (state) => {

    return {
        auth: state.auth,
        error: state.error.message
    }
}

export default withRouter(connect(mapStateToProps)(FacebookButton));
