import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {getProfileData, logout} from '../../action/index';
const Profile = (props) => {

    useEffect(() => {
        props.dispatch(getProfileData())
    },[])

    const clickHandler = (e) => {
        e.preventDefault();
        props.dispatch(logout(props.history))
    }

    return (
        <div style={{textAlign:'center',marginTop:'200px'}}>
             <p>Hey there, <strong>{props.auth.user.name}</strong>!
             Finally you are getting here!<span role="img" aria-label="clap">🖐</span></p>
             <button onClick={clickHandler}>LOG OUT</button>
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

export default withRouter(connect(mapStateToProps)(Profile));
